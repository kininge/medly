import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CgEyeAlt } from "../../../utilities/icons";
import { onSnapshot, collection } from "@firebase/firestore";
import firebaseDB from "../../../firebase";
import {} from "../../../utilities/constants";
import { IComingCustomer, ILogin } from "../../../interfaces/interface";
import { loginAuthenticate } from "../../../utilities/business-logic";
import {
  CUSTOMER_TYPES,
  MESSAGE_TYPES,
  MESSAGE_STYLES,
  AUTHENTICATION_SUCCESS_MESSAGE,
  AUTHENTICATION_FAIL_MESSAGE,
  COLLECTION,
  EMPTY_LOGIN_DATA,
} from "../../../utilities/constants";
import "./Login.scss";

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [customers, setCustomers] = useState<IComingCustomer[]>([]);
  const [loginData, setLoginData] = useState<ILogin>(EMPTY_LOGIN_DATA);
  const [isPasswordVisible, setPasswordVisibility] =
    useState<string>("password");

  useEffect(() => {
    const firebaseDBListener = onSnapshot(
      collection(firebaseDB, COLLECTION.customer),
      (snapshot) => {
        const customers: IComingCustomer[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as IComingCustomer[];

        setCustomers(customers);
      }
    );
    return firebaseDBListener; //close db listener
  }, []);

  const addLoggedUser = (user: IComingCustomer | null) => {
    dispatch({ type: CUSTOMER_TYPES.addCustomer, payload: user });
  };

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

  const changePasswordVisibility = () => {
    setPasswordVisibility(
      isPasswordVisible === "password" ? "text" : "password"
    );
  };

  const onValuesChange = (key: string, value: string) => {
    setLoginData({ ...loginData, ...{ [key]: value } });
  };

  const isFormValid = () => {
    return loginData.username && loginData.password ? true : false;
  };

  const onLoginFormSubmit = (form: React.FormEvent) => {
    form.preventDefault();

    const loggedUser: IComingCustomer | undefined = loginAuthenticate(
      customers,
      loginData
    );

    if (loggedUser) {
      addLoggedUser(loggedUser);
      sendMessage(
        MESSAGE_TYPES.addMessage,
        MESSAGE_STYLES.success,
        AUTHENTICATION_SUCCESS_MESSAGE
      );
    } else {
      sendMessage(
        MESSAGE_TYPES.addMessage,
        MESSAGE_STYLES.error,
        AUTHENTICATION_FAIL_MESSAGE
      );
    }
  };

  return (
    <section className="login-page margin-bottom-2">
      <form
        className="login-form form"
        name="loginForm"
        onSubmit={onLoginFormSubmit}
      >
        <div className="input-container margin-bottom-1">
          <label htmlFor="username">Username</label>
          <div className="input-box">
            <input
              id="username"
              type="text"
              value={loginData.username}
              onChange={(event) => {
                onValuesChange("username", event.target.value);
              }}
            />
          </div>
        </div>
        <div className="input-container margin-bottom-1">
          <label htmlFor="password">Password</label>
          <div className="input-box">
            <input
              id="password"
              type={isPasswordVisible}
              value={loginData.password}
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
          id="login-form-submit"
          className={
            isFormValid() ? "submit-button-active" : "submit-button-disable"
          }
          disabled={!isFormValid()}
          type="submit"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
