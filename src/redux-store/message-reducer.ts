import { IMessage, IMessageAction } from "../interfaces/interface";
import { MESSAGE_TYPES } from "../utilities/constants";

export const MessageReducer = (
  state: IMessage | null = null,
  action: IMessageAction
) => {
  switch (action.type) {
    case MESSAGE_TYPES.addMessage:
      return action.message; // add new message to show to user
    case MESSAGE_TYPES.removeMessage:
      return null; // remove message from user visibility
    default:
      return state; // just not changing in state of redux store
  }
};
