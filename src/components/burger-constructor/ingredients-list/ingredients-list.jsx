import styles from "./ingredients-list.module.css";
import BunElement from './bun-element/bun-element';
import OtherIngredientElements from './other-ingredient-elements/other-ingredient-elements';

const IngredientsList = () => {

    return (
        <section className={`${styles.list}`}>
            <BunElement type={'top'} />
            <OtherIngredientElements type={'center'} />
            <BunElement type={'bottom'} />
        </section>
    )
};

export default IngredientsList;