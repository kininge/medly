import { IComingCustomer, ILoggedUserAction } from "../interfaces/interface";
import { CUSTOMER_TYPES } from "../utilities/constants";

export const LoggedUserReducer = (
  state: IComingCustomer | null = null,
  action: ILoggedUserAction
) => {
  switch (action.type) {
    case CUSTOMER_TYPES.addCustomer:
      return action.payload; // adding newly logged user data
    case CUSTOMER_TYPES.removeCustomer:
      return null; // logging out  by clearing logged user data
    default:
      return state; // just not changing in state of redux store
  }
};
