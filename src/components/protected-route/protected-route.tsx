import { useAppSelector } from "../../services/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { getUserInfoPath } from "../../services/user/selectors";
import RequestMessage from "../request-message/request-message";

type Props = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

type Argument = {
  component: JSX.Element
};

const Protected = ({ onlyUnAuth = false, component }: Props) => {

  const { user, isAuthChecked } = useAppSelector(getUserInfoPath);

  const location = useLocation();

  // Запрос еще выполняется
  if (!isAuthChecked) {
    <RequestMessage message={'Загрузка...'} />
  };

  // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
  if (onlyUnAuth && user) {
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  // Пользователь неавторизован, a роут для авторизованного пользователя
  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  };

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({component}: Argument) => <Protected onlyUnAuth={true} component={component} />;