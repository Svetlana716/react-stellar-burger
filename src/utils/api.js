const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
};

//функция проверки ответа на `ok`
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

//функция проверки на `success`
const checkSuccess = (res) => {
  return res && res.success ? res : Promise.reject(`Ответ не success: ${res}`);
};

// функция запроса с проверкой ответа
const request = (endpoint, options) => {
  //базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${config.baseUrl}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

//обновление токена

export const refreshToken = () => {
  return request("/auth/token", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

//fetchWithRefresh используется в запросах получения и обновления данных пользователя.

export const fetchWithRefresh = async (endpoint, options) => {
  try {
    const res = await fetch(`${config.baseUrl}${endpoint}`, options);
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
      const res = await fetch(`${config.baseUrl}${endpoint}`, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

//регистрация пользователя

export const registerUser = (email, password, name) => {
  return request("/auth/register", {
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

export const getIngredientsData = () => request("/ingredients");

//получение информации о пользователе

export const getUserInfo = () => {
  return fetchWithRefresh("/auth/user", {
    headers: {
      ...config.headers,
      authorization: localStorage.getItem('accessToken'),
    },
  })
};

//получение информации о заказе

export const getOrderData = (number) => request(`/orders/${number}`);

//изменение информации о пользователе

export const changeUserInfo = (email, name) => {
  return fetchWithRefresh("/auth/user", {
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
  return fetchWithRefresh("/orders", {
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
  return request("/password-reset", {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      email: email,
    }),
  });
};

export const resetPasswordSecondStep = (password, token) => {
  return request("/password-reset/reset", {
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
  return request("/auth/login", {
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
  return request("/auth/logout", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })
};
