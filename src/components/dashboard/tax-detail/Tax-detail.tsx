import React from "react";
import { ITaxHistory } from "../../../interfaces/interface";
import { PAGE } from "../../../utilities/constants";
import { TiArrowLeftThick } from "../../../utilities/icons";
import { moneyWithCommas } from "../../../utilities/business-logic";
import "./Tax-detail.scss";

interface ITaxDetailProps {
  tax: ITaxHistory;
  onChangePage: (page: string) => void;
}

const TaxDetail: React.FC<ITaxDetailProps> = ({ tax, onChangePage }) => {
  return (
    <section className="tax-detail-page">
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
      <div className="tax-container margin-bottom-4 child-center-center">
        <p className="tax child-center-top">
          <span className="currency">&#8377;</span>
          <span className="tax-amount">{moneyWithCommas(tax.tax)}</span>
        </p>
        <p className="tax-text">Total payable tax</p>
      </div>
      <div className="tax-detail-container">
        <div className="card-center-aliner">
          <div className="tax-card">
            <div className="tax-amount-container child-center-top">
              <span className="amount">{tax.year}</span>
            </div>
            <p className="tax-description">Income tax in year</p>
          </div>
          <div className="tax-card">
            <div className="tax-amount-container child-center-top">
              <span className="amount">{tax.age}</span>
            </div>
            <p className="tax-description">Income tax at age</p>
          </div>
          <div className="tax-card">
            <div className="tax-amount-container child-center-top">
              <span className="currency">&#8377;</span>
              <span className="amount">{moneyWithCommas(tax.income)}</span>
            </div>
            <p className="tax-description">Total income in year</p>
          </div>
          <div className="tax-card">
            <div className="tax-amount-container child-center-top">
              <span className="currency">&#8377;</span>
              <span className="amount">{moneyWithCommas(tax.invest)}</span>
            </div>
            <p className="tax-description">Invest in government bond</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxDetail;
