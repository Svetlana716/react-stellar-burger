import PropTypes from "prop-types";
import  styles  from "./drop-target.module.css";

const DropTarget = ({ type }) => {

    let content;
    let wrapper = `${styles.dropContainer}`;
  
    if (type === 'top') {
      content = 'Добавьте булки';
      wrapper += ` ${styles.bunTopDropContainer}`;
    } else if (type === 'bottom') {
      content = 'Добавьте булки';
      wrapper += ` ${styles.bunBottomDropContainer}`;
    } else if (type === 'center') {
      content = 'Добавьте начинку';
      wrapper += ` ${styles.otherIngredientsDropContainer}`;
    } else {
      content = 'Выбран неправильный тип'
    }
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