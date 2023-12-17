const config = { 
  baseUrl: 'https://norma.nomoreparties.space/api', 
  headers: {  
    'Content-Type': 'application/json; charset=UTF-8'
  } 
}; 

function checkResponse (res) { 
  if (!res.ok) { 
    return Promise.reject(`Ошибка: ${res.status}`); 
  } 
  return res.json(); 
};

//универсальная функция запроса с проверкой ответа
function request(url, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkResponse)
};

export function getData () { 
  return request(`${config.baseUrl}/ingredients`, { 
    headers: config.headers 
})
}; 

export function postData (constructorIngredients) { 
  return request(`${config.baseUrl}/orders`, { 
  headers: config.headers,
  method: 'POST', 
  body: JSON.stringify({ 
    ingredients: constructorIngredients,
} ), 
})
}; 