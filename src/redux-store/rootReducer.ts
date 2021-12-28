import { combineReducers, Reducer, CombinedState } from "redux";
import {
  IComingCustomer,
  ILoggedUserAction,
  IMessage,
  IMessageAction,
} from "../interfaces/interface";
import { LoggedUserReducer } from "./logged-user-reducer";
import { MessageReducer } from "./message-reducer";

export interface IRootState {
  LoggedUserReducer: IComingCustomer | null;
  MessageReducer: IMessage | null;
}

export const rootReducer: Reducer<
  CombinedState<IRootState>,
  ILoggedUserAction | IMessageAction
> = combineReducers({
  LoggedUserReducer,
  MessageReducer,
});

export default rootReducer;
