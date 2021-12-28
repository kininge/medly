import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { CgEyeAlt, CgCalendarDates } from "../../../utilities/icons";
import { onSnapshot, collection, addDoc } from "@firebase/firestore";
import firebaseDB from "../../../firebase";
import {
  ICustomer,
  IComingCustomer,
  ISignUp,
} from "../../../interfaces/interface";
import {
  EMPTY_SIGNUP_DATA,
  DISPLAY_DATA_FORMAT,
  COLLECTION,
  MESSAGE_TYPES,
  MESSAGE_STYLES,
  SIGNUP_SUCCESS_MESSAGE,
  SIGNUP_FAIL_MESSAGE,
} from "../../../utilities/constants";
import "./Sign-up.scss";

interface ISignUpProps {
  switchToLogin: () => void;
}

const SignUp: React.FC<ISignUpProps> = ({ switchToLogin }) => {
  const dispatch = useDispatch();
  const today: string = moment(new Date()).format("yyyy-MM-DD");

  const [customers, setCustomers] = useState<IComingCustomer[]>([]);
  const [signUpData, setSignUpData] = useState<ISignUp>(EMPTY_SIGNUP_DATA);
  const [isUserTaken, setIsUserTaken] = useState<boolean>(false);
  const [isPasswordVisible, setPasswordVisibility] =
    useState<string>("password");

  useEffect(() => {
    const firebaseDBListener = onSnapshot(
      collection(firebaseDB, "customer"),
      (snapshot) => {
        const customers: IComingCustomer[] = snapshot.docs.map((doc) =>
          doc.data()
        ) as IComingCustomer[];

        setCustomers(customers);
      }
    );
    return firebaseDBListener; //close db listener
  }, []);

  const sendMessage = (
    messageType: string,
    messageStyle: string,
    message: string
  ) => {
    dispatch({
      type: messageType,
      message: {
        message: message,
        messageType: messageStyle,
      },
    });
  };

  const checkIsUserTaken = (username: string) => {
    const isExist = customers.some(
      (customer) => customer.username === username
    );
    setIsUserTaken(isExist);
  };

  const onValuesChange = (key: string, value: string | Date) => {
    if (key === "username") {
      checkIsUserTaken(value as string);
    }

    if (key === "birthdate") {
      value = new Date(moment(value).clone().format());
      setSignUpData({ ...signUpData, ...{ [key]: value as Date } });
    } else {
      setSignUpData({ ...signUpData, ...{ [key]: value as string } });
    }
  };

  const changePasswordVisibility = () => {
    setPasswordVisibility(
      isPasswordVisible === "password" ? "text" : "password"
    );
  };

  const isFormValid = () => {
    return signUpData.name &&
      signUpData.birthdate &&
      !isUserTaken &&
      signUpData.username &&
      signUpData.password
      ? true
      : false;
  };

  const datePipe = (date: Date) => {
    if (isNaN(Number(date)) !== true) {
      const displayDate = moment(date).format(DISPLAY_DATA_FORMAT);
      return displayDate;
    }
  };

  const onSignUpFormSubmit = async (form: React.FormEvent) => {
    form.preventDefault();

    let firstName: string | null = null;
    let middleName: string | null = null;
    let lastName: string | null = null;
    const nameList = signUpData.name.trim().split(" ");

    switch (nameList.length) {
      case 3:
        firstName = nameList[0];
        middleName = nameList[1];
        lastName = nameList[2];
        break;
      case 2:
        firstName = nameList[0];
        lastName = nameList[1];
        break;
      default:
        firstName = nameList[0];
        break;
    }

    const createNewRecord: ICustomer = {
      account_type: "customer",
      birth_date: signUpData.birthdate,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      tax: [],
      username: signUpData.username.trim(),
      password: signUpData.password.trim(),
    };

    const collectionRef = collection(firebaseDB, COLLECTION.customer);
    const response = await addDoc(collectionRef, createNewRecord);

    if (response) {
      switchToLogin();
      sendMessage(
        MESSAGE_TYPES.addMessage,
        MESSAGE_STYLES.success,
        SIGNUP_SUCCESS_MESSAGE
      );
    } else {
      sendMessage(
        MESSAGE_TYPES.addMessage,
        MESSAGE_STYLES.error,
        SIGNUP_FAIL_MESSAGE
      );
    }
  };

  return (
    <section className="sign-up-page margin-bottom-2">
      <form
        className="sign-up-form form"
        name="SignUpForm"
        onSubmit={onSignUpFormSubmit}
      >
        <div className="input-container margin-bottom-1">
          <label htmlFor="username">Name</label>
          <div className="input-box">
            <input
              id="name"
              type="text"
              value={signUpData.name}
              onChange={(event) => {
                onValuesChange("name", event.target.value);
              }}
            />
          </div>
        </div>
        <div className="input-container margin-bottom-1">
          <label htmlFor="username">Birthdate</label>
          <div className="input-box">
            <div className="dummy-input">{datePipe(signUpData.birthdate)}</div>
            <input
              id="birthdate"
              className="date-input"
              type="date"
              max={today}
              value={datePipe(signUpData.birthdate)}
              onChange={(event) => {
                onValuesChange("birthdate", event.target.value);
              }}
            />
            <button
              id="datepicker"
              type="button"
              className="action-container-active"
            >
              <CgCalendarDates className="action-icon" />
            </button>
          </div>
        </div>
        <div className="input-container margin-bottom-1">
          <label htmlFor="username">Username</label>
          <div className="input-box">
            <input
              id="username"
              type="text"
              value={signUpData.username}
              onChange={(event) => {
                onValuesChange("username", event.target.value);
              }}
            />
          </div>
          {isUserTaken && (
            <small className="user-message">This username already taken</small>
          )}
        </div>
        <div className="input-container margin-bottom-1">
          <label htmlFor="password">Password</label>
          <div className="input-box">
            <input
              id="password"
              type={isPasswordVisible}
              value={signUpData.password}
              onChange={(event) => {
                onValuesChange("password", event.target.value);
              }}
            />
            <button
              id="visibility-toggle-button"
              type="button"
              className={
                isPasswordVisible === "password"
                  ? "action-container"
                  : "action-container-active"
              }
              onClick={changePasswordVisibility}
            >
              <CgEyeAlt className="action-icon" />
            </button>
          </div>
        </div>
        <button
          id="sign-up-form-submit"
          className={
            isFormValid() ? "submit-button-active" : "submit-button-disable"
          }
          disabled={!isFormValid()}
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default SignUp;
