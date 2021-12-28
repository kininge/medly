import React, { useState, useEffect } from "react";
import {
  COLLECTION,
  MESSAGE_STYLES,
  MESSAGE_TYPES,
  PAGE,
  TAX_FAIL_MESSAGE,
  TAX_SUCCESS_MESSAGE,
} from "../../../utilities/constants";
import { TiArrowLeftThick } from "../../../utilities/icons";
import { collection, onSnapshot, setDoc, doc } from "@firebase/firestore";
import firebaseDB from "../../../firebase";
import {
  IComingCustomer,
  ITax,
  ITaxInput,
  ITaxHistory,
} from "../../../interfaces/interface";
import { calculateIncomeTax } from "../../../utilities/business-logic";
import { EMPTY_TAX_INPUT_DATA } from "../../../utilities/constants";
import "./Calculate-tax.scss";
import { useDispatch } from "react-redux";

interface ICalculateTaxProps {
  loggedUser: IComingCustomer;
  onChangePage: (page: string) => void;
  addNewTax: (newTax: ITaxHistory) => void;
}

const CalculateTax: React.FC<ICalculateTaxProps> = ({
  loggedUser,
  onChangePage,
  addNewTax,
}) => {
  const dispatch = useDispatch();

  const [taxes, setTax] = useState<ITax[]>([]);
  const [isTax, setIsTax] = useState<boolean>(true);
  const [taxInput, setTaxInput] = useState<ITaxInput>(EMPTY_TAX_INPUT_DATA);

  useEffect(() => {
    const firebaseDBListener = onSnapshot(
      collection(firebaseDB, COLLECTION.tax),
      (snapshot) => {
        const taxes: ITax[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as ITax[];

        setTax(taxes);
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

  const isTaxAvailable = (year: number) => {
    const isExist = taxes.some((tax) => {
      return tax.year === year;
    });
    setIsTax(isExist);
  };

  const onValuesChange = (key: string, value: number) => {
    if (key === "year") {
      isTaxAvailable(value);
    }

    setTaxInput({ ...taxInput, ...{ [key]: value } });
  };

  const isFormValid = () => {
    return taxInput.year && isTax && taxInput.income && taxInput.invest
      ? true
      : false;
  };

  const onCalculateTaxFromSubmit = async (form: React.FormEvent) => {
    form.preventDefault();

    const taxRecord: ITaxHistory = calculateIncomeTax(
      loggedUser.birth_date.seconds,
      taxInput,
      taxes
    );
    const userWithNewTax: IComingCustomer = loggedUser;
    userWithNewTax.tax.push(taxRecord);

    const documentReference = doc(
      firebaseDB,
      COLLECTION.customer,
      userWithNewTax.id
    );
    const response = await setDoc(documentReference, userWithNewTax);

    if (typeof response === "object") {
      sendMessage(
        MESSAGE_TYPES.addMessage,
        MESSAGE_STYLES.success,
        TAX_SUCCESS_MESSAGE
      );
    } else {
      sendMessage(
        MESSAGE_TYPES.addMessage,
        MESSAGE_STYLES.success,
        TAX_FAIL_MESSAGE
      );
    }

    addNewTax(taxRecord);
  };

  return (
    <section className="calculate-tax-page">
      <header className="margin-bottom-2">
        <button
          className="back-button"
          onClick={() => {
            onChangePage(PAGE.dashboard);
          }}
        >
          <TiArrowLeftThick className="back-icon" />
        </button>
      </header>

      <div className="calculate-tax-container">
        <form
          className="calculate-tax-form form"
          name="CalculateTaxForm"
          onSubmit={onCalculateTaxFromSubmit}
        >
          <div className="input-container margin-bottom-1">
            <label htmlFor="username">Year</label>
            <div className="input-box">
              <input
                id="year"
                type="number"
                value={Number(taxInput.year)}
                onChange={(event) => {
                  onValuesChange("year", Number(event.target.value));
                }}
              />
            </div>
            {!isTax && (
              <small className="user-message">
                Government not declared tax rule for {taxInput.year} year
              </small>
            )}
          </div>
          <div className="input-container margin-bottom-1">
            <label htmlFor="username">Income</label>
            <div className="input-box">
              <input
                id="income"
                type="number"
                value={Number(taxInput.income)}
                onChange={(event) => {
                  onValuesChange("income", Number(event.target.value));
                }}
              />
            </div>
          </div>
          <div className="input-container margin-bottom-1">
            <label htmlFor="username">Government bond investment</label>
            <div className="input-box">
              <input
                id="invest"
                type="number"
                value={Number(taxInput.invest)}
                onChange={(event) => {
                  onValuesChange("invest", Number(event.target.value));
                }}
              />
            </div>
          </div>
          <button
            id="calculate-tax-form-submit"
            className={
              isFormValid() ? "submit-button-active" : "submit-button-disable"
            }
            disabled={!isFormValid()}
            type="submit"
          >
            Calculate Tax
          </button>
        </form>
      </div>
    </section>
  );
};

export default CalculateTax;
