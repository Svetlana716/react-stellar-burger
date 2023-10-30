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

export function getData () { 
  return fetch(`${config.baseUrl}/ingredients`, { 
    headers: config.headers 
}) 
.then(checkResponse) 
}; 

export function postOrder (constructorIngredients) { 
  return fetch(`${config.baseUrl}/orders`, { 
  headers: config.headers,
  method: 'POST', 
  body: JSON.stringify({ 
    "ingredients": constructorIngredients,
} ), 
}) 
.then(checkResponse) 
}; 