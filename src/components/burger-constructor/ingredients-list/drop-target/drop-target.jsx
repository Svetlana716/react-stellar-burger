import PropTypes from "prop-types";
import styles from "./drop-target.module.css";

const DropTarget = ({ type }) => {

  let content;
  let wrapper = styles.dropContainer;

  switch (type) {
    case 'top':
      content = 'Добавьте булки';
      wrapper += ' ' + styles.bunTopDropContainer;
      break;

    case 'center':
      content = 'Добавьте начинку';
      wrapper += ' ' + styles.otherIngredientsDropContainer;
      break;

    case 'bottom':
      content = 'Добавьте булки';
      wrapper += ' ' + styles.bunBottomDropContainer;
      break;

    default:
      content = 'Выбран неправильный тип';
  };

  return (
    <div className={wrapper}>
      <p className={'text text_type_main-default'}>{content}</p>
    </div>
  )
};

DropTarget.propTypes = {
  type: PropTypes.string.isRequired
}

export default DropTarget 