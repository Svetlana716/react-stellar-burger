const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
};

// проверка ошибок
export function checkReject (err) { 
  console.error(`Ошибка: ${err}`); 
} 
// проверка ответа
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// функция запроса с проверкой ответа
const request = (url, options) => {
  return fetch(url, options).then(checkResponse)
};

//обновление токена

export const refreshToken = () => {
  return request(`${config.baseUrl}/auth/token`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

//fetchWithRefresh используется в запросах получения и обновления данных пользователя.

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

//регистрация пользователя

export const registerUser = (email, password, name) => {
  return request(`${config.baseUrl}/auth/register`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
};

// получение списка ингридиентов

export const getIngredientsData = () => {
  return request(`${config.baseUrl}/ingredients`, {
    headers: config.headers,
  })
};

//получение информации о пользователе

export const getUserInfo = () => {
  return fetchWithRefresh(`${config.baseUrl}/auth/user`, {
    headers: {
      ...config.headers,
      authorization: localStorage.getItem('accessToken'),
    },
  })
};

//изменение информации о пользователе

export const changeUserInfo = (email, name) => {
  return fetchWithRefresh(`${config.baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: {
      ...config.headers,
      authorization: localStorage.getItem('accessToken'),
    },
    body: JSON.stringify({
      email: email,
      name: name,
    }),
  })
};

//создание заказа

export const postOrderData = (constructorIngredients) => {
  return fetchWithRefresh(`${config.baseUrl}/orders`, {
    method: 'POST',
    headers: {
      ...config.headers,
      authorization: localStorage.getItem('accessToken'),
    },
    body: JSON.stringify({
      ingredients: constructorIngredients,
    }),
  });
};

//сброс пароля

export const resetPasswordFirstStep = (email) => {
  return request(`${config.baseUrl}/password-reset`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      email: email,
    }),
  });
};

export const resetPasswordSecondStep = (password, token) => {
  return request(`${config.baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      password: password,
      token: token
    }),
  });
};



//авторизация по логину и паролю

export const login = (email, password) => {
  return request(`${config.baseUrl}/auth/login`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
};

//выход из профиля

export const logout = () => {
  return request(`${config.baseUrl}/auth/logout`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })
};






