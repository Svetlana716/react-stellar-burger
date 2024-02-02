import { useInView } from 'react-intersection-observer';
import { useMemo, useEffect } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-ingredients.module.css";
import IngredientGroup from "./ingredient-group/ingredient-group";
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { setCurrentTab } from '../../services/burger-ingredients/slice';
//путь до селектора
import { getIngredientsPath } from "../../services/burger-ingredients/selectors";

const BurgerIngredients = () => {

    const dispatch = useAppDispatch();
    const { allIngredients, currentTab } = useAppSelector(getIngredientsPath);
    
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

    const onTabClick = (tab: string) => {
        dispatch(setCurrentTab(tab));
        const item = document.getElementById(tab);
        if (item) {
            item.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className={`${styles.ingredients}`}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <div className={`${styles.tabContainer}`}>
                <Tab 
                    value='bun' 
                    active={currentTab === 'bun'}
                    onClick={onTabClick}
                    >
                    Булки
                </Tab>
                <Tab 
                    value='sauce' 
                    active={currentTab === 'sauce'}
                    onClick={onTabClick}
                >
                    Соусы
                </Tab>
                <Tab 
                    value='main' 
                    active={currentTab === 'main'}
                    onClick={onTabClick}
                >
                    Начинки
                </Tab>
            </div>
            <ul className={styles.ingredientsContainer}>
                <li ref={bunRef}>
                    <IngredientGroup 
                        title='Булки' 
                        titleId= 'bun'
                        ingredientType={bun} 
                        />
                </li>
                <li ref={sauceRef}>
                    <IngredientGroup 
                        title='Соусы'
                        titleId= 'sauce'
                        ingredientType={sauce} 
                    />
                </li>
                <li ref={mainRef}>
                    <IngredientGroup 
                        title={'Начинки'} 
                        titleId= 'main'
                        ingredientType={main} 
                    />
                </li>
            </ul>
        </section>
    );
};


export default BurgerIngredients;