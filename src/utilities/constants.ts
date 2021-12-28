import { ILogin, ISignUp, ITaxInput } from "../interfaces/interface";

export const APPLICATION_TITLE: string = "Coderland";
export const APPLICATION_SUB_TITLE: string = "Tax";
export const DISPLAY_DATA_FORMAT: string = "ddd, DD MMM yyyy";
export const EMPTY_LOGIN_DATA: ILogin = {
  username: "",
  password: "",
};
export const EMPTY_SIGNUP_DATA: ISignUp = {
  name: "",
  birthdate: {} as Date,
  username: "",
  password: "",
};
export const EMPTY_TAX_INPUT_DATA: ITaxInput = {
  year: undefined,
  income: undefined,
  invest: undefined,
};
export const AUTHENTICATION_SUCCESS_MESSAGE: string =
  "User successfully authenticated!";
export const AUTHENTICATION_FAIL_MESSAGE: string =
  "Authentication failed, Please check your username and password";
export const SIGNUP_SUCCESS_MESSAGE: string = "User created successfully!";
export const SIGNUP_FAIL_MESSAGE: string =
  "Sign up failed, Please try again some time";
export const LOGOUT_SUCCESS_MESSAGE: string = "You logged out successfully!";
export const TAX_SUCCESS_MESSAGE: string = "Tax calculate successfully!";
export const TAX_FAIL_MESSAGE: string =
  "Tax calculated, but fail to update database";

export const MESSAGE_TYPES = {
  addMessage: "Add_Message",
  removeMessage: "Remove_Message",
};

export const MESSAGE_STYLES = {
  success: "success",
  info: "info",
  error: "error",
};

export const CUSTOMER_TYPES = {
  addCustomer: "Add_Customer",
  removeCustomer: "Remove_Customer",
};

export const COLLECTION = {
  customer: "customer",
  tax: "tax",
  accountType: "account",
};

export const PAGE = {
  dashboard: "dashboard",
  taxCalculate: "tax-calculate",
  taxDetail: "tax-detail",
};
