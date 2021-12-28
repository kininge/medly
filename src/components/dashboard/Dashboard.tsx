import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CgAdd } from "../../utilities/icons";
import { IComingCustomer, ITaxHistory } from "../../interfaces/interface";
import { IRootState } from "../../redux-store/rootReducer";
import {
  APPLICATION_TITLE,
  APPLICATION_SUB_TITLE,
  CUSTOMER_TYPES,
  MESSAGE_TYPES,
  MESSAGE_STYLES,
  LOGOUT_SUCCESS_MESSAGE,
  PAGE,
} from "../../utilities/constants";
import { moneyWithCommas } from "../../utilities/business-logic";
import TaxDetail from "./tax-detail/Tax-detail";
import CalculateTax from "./calculate-tax/Calculate-tax";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const loggedUser: IComingCustomer = useSelector<IRootState>(
    (state) => state.LoggedUserReducer
  ) as IComingCustomer;
  const lastFourTax: ITaxHistory[] = loggedUser.tax.slice(
    loggedUser.tax.length - 4
  );

  const [page, setPage] = useState<string>(PAGE.dashboard);
  const [tax, setTax] = useState<ITaxHistory>({} as ITaxHistory);

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

  const onPageChange = (newPage: string) => {
    setPage(newPage);
  };

  const logout = () => {
    addLoggedUser(null);
    sendMessage(
      MESSAGE_TYPES.addMessage,
      MESSAGE_STYLES.success,
      LOGOUT_SUCCESS_MESSAGE
    );
  };

  const openDetailOfTaxCalculation = (index: number) => {
    const taxForDetail: ITaxHistory = lastFourTax[index];
    setTax(taxForDetail);
    onPageChange(PAGE.taxDetail);
  };

  const calculateNewTax = () => {
    onPageChange(PAGE.taxCalculate);
  };

  const addNewTax = (newTax: ITaxHistory) => {
    setTax(newTax);
    onPageChange(PAGE.taxDetail);
  };

  return (
    <section className="dashboard-page child-center-center">
      <div className="application">
        <header className="application-header child-separate-center margin-bottom-3">
          <div className="application-title-container child-center-baseline">
            <h1 className="application-title">{APPLICATION_TITLE}</h1>
            <h2 className="application-sub-title">{APPLICATION_SUB_TITLE}</h2>
          </div>

          <div className="user-section child-center-center">
            <div className="logged-user">
              <span className="greet">Hi</span>
              <span className="user">{loggedUser.first_name}</span>
            </div>
            <button className="logout" onClick={logout}>
              Logout
            </button>
          </div>
        </header>

        {page === PAGE.dashboard && (
          <section className="tax-card-container">
            {lastFourTax.map((user, index) => (
              <div
                className="tax-card"
                key={`${user.year}-${user.income}-${user.invest}-${user.age}-${user.tax}`}
                onClick={() => {
                  openDetailOfTaxCalculation(index);
                }}
              >
                <div className="card-body">
                  <div className="tax-container">
                    <span className="currency">&#8377;</span>
                    <span className="tax-amount">
                      {moneyWithCommas(user.tax)}
                    </span>
                  </div>
                  <p className="tax-year-container child-center-center">
                    Tax on year <span className="tax-year">{user.year}</span>
                  </p>
                </div>
              </div>
            ))}

            <div
              className="add-card child-center-center"
              onClick={calculateNewTax}
            >
              <CgAdd className="add-icon" />
            </div>
          </section>
        )}

        {page === PAGE.taxDetail && (
          <TaxDetail tax={tax} onChangePage={onPageChange} />
        )}

        {page === PAGE.taxCalculate && (
          <CalculateTax
            loggedUser={loggedUser}
            onChangePage={onPageChange}
            addNewTax={addNewTax}
          />
        )}
      </div>
    </section>
  );
};

export default Dashboard;
