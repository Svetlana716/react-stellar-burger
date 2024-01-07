import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from '../../services/burger-ingredients/actions';
//обертка для всех страниц с шапкой и общими стилями
import PageWrapper from "../../components/page-wrapper/page-wrapper";
//pages
import HomePage from '../../pages/home-page/home-page';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from "../../pages/register-page/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import AccountPage from "../../pages/account-page/account-page";
import FeedPage from "../../pages/feed-page/feed-page";
import OrdersPage from "../../pages/orders-page/orders-page";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
//для модалки
import Modal from "../modal/modal";
import IngredientDetails from "../burger-ingredients/ingredient-type/ingredient-details/ingredient-details";
import OrderFeedDetails from "../order-feed-details/order-feed-details";
//для защищенного роутинга
import { checkUserAuth } from '../../services/user/actions';
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
    dispatch(getIngredients());
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

        <Route path="/feed" element={<FeedPage/>} />
        <Route path="/feed/:number" element={<OrderFeedDetails />} />

        <Route path="/profile" element={<OnlyAuth component={<AccountPage/>} />}>
          <Route index element={<OnlyAuth component={<ProfilePage/>} />} />
          <Route path="orders" element={<OnlyAuth component={<OrdersPage/>} />} />
          <Route path="orders/:number" element={<OnlyAuth component={<OrderFeedDetails/>} />} />
        </Route>
        
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
          <Route
	          path="/feed/:number"
	          element={
	            <Modal onClose={handleModalClose}>
	              <OrderFeedDetails />
	            </Modal>
	          }
	        />
          <Route 
	          path="/profile/orders/:number"
	          element={
	            <Modal onClose={handleModalClose}>
	              <OrderFeedDetails />
	            </Modal>
	          }
	        />
        </Routes>
      )}
    </PageWrapper>
  );
}

export default App;
