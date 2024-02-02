import styles from "./request-message.module.css";

type Props = {
    message: string;
    error?: string;
  };

const RequestMessage = ({message, error}: Props) => {
    const style = error ? styles.error : styles.message;

    return (
        <p className={style}>{message}</p>
    );
};


export default RequestMessage;