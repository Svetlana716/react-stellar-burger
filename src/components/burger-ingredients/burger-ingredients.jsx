import { useInView } from 'react-intersection-observer';
import { useMemo, useEffect } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-ingredients.module.css";
import IngredientType from "./ingredient-type/ingredient-type";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTab } from '../../services/burger-ingredients/actions';
//путь до селектора
import { getIngredientsPath } from "../../services/burger-ingredients/selectors";

const BurgerIngredients = () => {

    const dispatch = useDispatch();
    const { allIngredients, current } = useSelector(getIngredientsPath);

    //фильтрация массива ингридиентов
    const bun = useMemo(
        () =>
            allIngredients.filter((ingredient) => {
                return ingredient.type === 'bun';
            }),
        [allIngredients]
    );

    const sauce = useMemo(
        () =>
            allIngredients.filter((ingredient) => {
                return ingredient.type === 'sauce';
            }),
        [allIngredients]
    );

    const main = useMemo(
        () =>
            allIngredients.filter((ingredient) => {
                return ingredient.type === 'main';
            }),
        [allIngredients]
    );

    const [bunRef, inViewBun] = useInView({ threshold: 0 });
    const [sauceRef, inViewSauce] = useInView({ threshold: 0 });
    const [mainRef, inViewMain] = useInView({ threshold: 0 });


    useEffect(() => {
        if (inViewBun) {
            dispatch(setCurrentTab('bun'))
        } else if (inViewSauce) {
            dispatch(setCurrentTab('sauce'))
        } else if (inViewMain) {
            dispatch(setCurrentTab('main'))
        }
    }, [inViewBun, inViewSauce, inViewMain]);

    return (
        <section className={`${styles.ingredients}`}>
            <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
            <div className={`${styles.tabContainer}`}>
                <Tab value='bun' active={current === 'bun'}>
                    Булки
                </Tab>
                <Tab value='sauce' active={current === 'sauce'}>
                    Соусы
                </Tab>
                <Tab value='main' active={current === 'main'}>
                    Начинки
                </Tab>
            </div>
            <ul className={`${styles.ingredientsContainer} custom-scroll`}>
                <li ref={bunRef}>
                    <IngredientType title={'Булки'} ingredientType={bun} />
                </li>
                <li ref={sauceRef}>
                    <IngredientType title={'Соусы'} ingredientType={sauce} />
                </li>
                <li ref={mainRef}>
                    <IngredientType title={'Начинки'} ingredientType={main} />
                </li>
            </ul>
        </section>
    );
};


export default BurgerIngredients;