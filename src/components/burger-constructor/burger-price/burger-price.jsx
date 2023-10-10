import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../../utils/prop-types";
import styles from "./burger-price.module.css";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerPrice = ({ ingredients }) => {
    // стоимость корзины
    const total = React.useMemo(
        () =>
        ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0),
        [ingredients]
    );

    return (
        <section className={`${styles.burgerPrice}`}>
            <div className={`${styles.priceContainer}`}>
                <span className="text text_type_digits-medium">{total}</span>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large">
                Оформить заказ
            </Button>
        </section>
    );
};

BurgerPrice.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerPrice;