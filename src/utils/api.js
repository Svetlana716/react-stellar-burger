const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

function checkResponse (res) { 
  if (!res.ok) { 
    return Promise.reject(`Ошибка: ${res.status}`); 
  } 
  return res.json(); 
};

export function getData () { 
  return fetch(apiUrl) 
.then(checkResponse) 
}; 