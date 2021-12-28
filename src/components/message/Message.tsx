import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IMessage } from "../../interfaces/interface";
import { IRootState } from "../../redux-store/rootReducer";
import { MESSAGE_STYLES, MESSAGE_TYPES } from "../../utilities/constants";
import "./Message.scss";

const Message: React.FC = () => {
  const dispatch = useDispatch();

  const message: IMessage | null | unknown = useSelector<IRootState>(
    (state) => state.MessageReducer
  );

  if (message !== null) {
    setTimeout(() => {
      {
        dispatch({
          type: MESSAGE_TYPES.removeMessage,
          message: null,
        });
      }
    }, 3000);
  }

  const selectMessageStyle = () => {
    switch ((message as IMessage).messageType) {
      case MESSAGE_STYLES.success:
        return "success-message";
      case MESSAGE_STYLES.info:
        return "information-message";
      case MESSAGE_STYLES.error:
        return "error-message";
    }
  };

  return (
    <>
      {message !== null && (
        <section
          className={`message-box child-center-center ${selectMessageStyle()}`}
        >
          <p className="message">{(message as IMessage).message}</p>
        </section>
      )}
    </>
  );
};

export default Message;
