import React from "react";
import Login from "../login/Login-container";
import Dashboard from "../dashboard/Dashboard";
import Message from "../message/Message";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux-store/rootReducer";
import "./App.scss";

const App: React.FC = () => {
  const loggedUser = useSelector<IRootState>(
    (state) => state.LoggedUserReducer
  );

  const checkIsUserLogged = () => {
    return loggedUser === null ? <Login /> : <Dashboard />;
  };

  return (
    <div className="income-tax-application">
      {checkIsUserLogged()}
      <Message />
    </div>
  );
};

export default App;
