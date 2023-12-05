import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
//обертка для всех страниц с шапкой и общими стилями
import PageWrapper from "../../components/page-wrapper/page-wrapper";
//pages
import HomePage from '../../pages/home-page/home-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from "../../pages/register-page/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
//для модалки
import IngredientDetails from '../../components/burger-ingredients/ingredient-type/ingredient-details/ingredient-details';
import Modal from "../../components/modal/modal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from '../../services/burger-ingredients/actions';
//для защищенного роутинга
import { checkUserAuth } from '../../services/auth/actions';
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";

const App = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

    useEffect(() => {
      dispatch(checkUserAuth());
    }, [dispatch]);

  return (
    <PageWrapper>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegisterPage/>} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage/>} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage/>} />} />
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage/>} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
	        <Route
	          path="/ingredients/:ingredientId"
	          element={
	            <Modal onClose={handleModalClose}>
	              <IngredientDetails />
	            </Modal>
	          }
	        />
        </Routes>
      )}
    </PageWrapper>
  );
}

export default App;
