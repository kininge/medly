export interface ILogin {
  username: string;
  password: string;
}

export interface ISignUp {
  name: string;
  birthdate: Date;
  username: string;
  password: string;
}

export interface ILoggedUserAction {
  type: "Add_Customer" | "Remove_Customer";
  payload: IComingCustomer | null;
}

export interface IMessage {
  message: string;
  messageType: "success" | "info" | "error";
}

export interface IMessageAction {
  type: "Add_Message" | "Remove_Message";
  message: IMessage;
}

export interface ITax {
  id: string;
  year: number | null;
  exempt_limit: number | null;
  tax_bracket: string[] | null;
  tax_percentage: number[] | null;
  cess_on: { amount_above: number | null; percentage: number | null };
  age_exempt: { age_above: number | null; exempt: number | null };
}

export interface ITaxHistory {
  year: number;
  age: number;
  income: number;
  invest: number;
  tax: number;
}

export interface ICustomer {
  account_type: string;
  birth_date: Date;
  username: string;
  password: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  tax: ITaxHistory[];
}

export interface IComingCustomer {
  id: string;
  account_type: string;
  birth_date: { seconds: number; nanoseconds: number };
  username: string;
  password: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  tax: ITaxHistory[];
}

export interface IAccount {
  type: string;
}

export interface ITaxInput {
  year?: number;
  income?: number;
  invest?: number;
}
