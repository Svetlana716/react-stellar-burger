import styles from "./request-message.module.css";
import PropTypes from "prop-types";

const RequestMessage = ({message, error}) => {
    const style = error ? styles.error : styles.message;

    return (
        <p className={style}>{message}</p>
    );
};

RequestMessage.propTypes = {
    message: PropTypes.string.isRequired,
};


export default RequestMessage;