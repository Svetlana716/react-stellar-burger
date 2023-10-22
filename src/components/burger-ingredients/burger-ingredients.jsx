import { useState, useMemo, useRef } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import styles from "./burger-ingredients.module.css";
import IngredientType from "./ingredient-type/ingredient-type"

const BurgerIngredients = ({ ingredients }) => {
    //задаем стейт компонента
    const [current, setCurrent] = useState('bun');

    //фильтрация массива ингридиентов
    const bun = useMemo(
        () =>
            ingredients.filter((ingredient) => {
                return ingredient.type === 'bun';
            }),
        [ingredients]
    );

    const sauce = useMemo(
        () =>
            ingredients.filter((ingredient) => {
                return ingredient.type === 'sauce';
            }),
        [ingredients]
    );

    const main = useMemo(
        () =>
            ingredients.filter((ingredient) => {
                return ingredient.type === 'main';
            }),
        [ingredients]
    );

    // ссылки на тип ингридиента в списке 
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    //скролл к выбранному типу ингридиента
    const handleScroll = (value) => {
        setCurrent(value)
        if (value === 'bun') bunRef.current.scrollIntoView({ behavior: "smooth" });
        if (value === 'sauce') sauceRef.current.scrollIntoView({ behavior: "smooth" });
        if (value === 'main') mainRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className={`${styles.ingredients}`}>
            <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
            <div className={`${styles.tabContainer}`}>
                <Tab value='bun' active={current === 'bun'} onClick={handleScroll}>
                    Булки
                </Tab>
                <Tab value='sauce' active={current === 'sauce'} onClick={handleScroll}>
                    Соусы
                </Tab>
                <Tab value='main' active={current === 'main'} onClick={handleScroll}>
                    Начинки
                </Tab>
            </div>
            <ul className={`${styles.ingredientsContainer} custom-scroll`}>
                <li ref={bunRef}>
                    <IngredientType title={'Булки'} ingredientType={bun}  />
                </li>
                <li ref={sauceRef}>
                    <IngredientType title={'Соусы'} ingredientType={sauce}  />
                </li>
                <li ref={mainRef}>
                    <IngredientType title={'Начинки'} ingredientType={main}  />
                </li>
            </ul>
        </section>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerIngredients;