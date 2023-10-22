import styles from "./request-message.module.css";
import PropTypes from "prop-types";

const RequestMessage = ({message}) => {
    return (
        <p className={`${styles.message} text text_type_main-large`}>{message}</p>
    );
};

RequestMessage.propTypes = {
    message: PropTypes.string.isRequired,
};


export default RequestMessage;