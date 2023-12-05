import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getAuthInfoPath } from "../../services/auth/selectors";
import RequestMessage from "../request-message/request-message";

const Protected = ({ onlyUnAuth = false, component }) => {

  const { user, isAuthChecked } = useSelector(getAuthInfoPath);
  
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    <RequestMessage message={'Загрузка...'} />
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
