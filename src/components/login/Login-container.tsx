import React, { useState } from "react";
import {
  APPLICATION_TITLE,
  APPLICATION_SUB_TITLE,
} from "../../utilities/constants";
import Login from "./login/Login";
import SignUp from "./sign-up/Sign-up";
import "./Login-container.scss";

const LoginContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("login");

  const switchToLogin = () => {
    setActiveTab("login");
  };

  return (
    <section className="login-container-page child-center-center">
      <section className="login-container-section">
        <div className="application-title-container child-center-baseline margin-bottom-3 margin-top-2">
          <h1 className="application-title">{APPLICATION_TITLE}</h1>
          <h2 className="application-sub-title">{APPLICATION_SUB_TITLE}</h2>
        </div>
        <div className="tab-container child-center-center margin-bottom-2">
          <button
            id="login-tab"
            className={activeTab === "login" ? "tab accent-active" : "tab"}
            onClick={() => {
              setActiveTab("login");
            }}
          >
            Login
          </button>
          <button
            id="sign-up-tab"
            className={activeTab === "sign-up" ? "tab accent-active" : "tab"}
            onClick={() => {
              setActiveTab("sign-up");
            }}
          >
            Sign Up
          </button>
        </div>
        {activeTab === "login" && <Login />}
        {activeTab === "sign-up" && <SignUp switchToLogin={switchToLogin} />}
      </section>
    </section>
  );
};

export default LoginContainer;
