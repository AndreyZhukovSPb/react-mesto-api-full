// export const BASE_URL = 'https://auth.nomoreparties.co'
// export const BASE_URL = 'http://localhost:3001'
export const BASE_URL = 'https://settler.students.nomoredomains.icu';

function request ({
  url,
  method,
  token,
  data,
  }) {
  return fetch(
    `${BASE_URL}${url}`,
    {
      method,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...!!token && {"Authorization": `Bearer ${token}`}
      },
      ...!!data && {body: JSON.stringify(data)}
    })
    .then(res =>{
      return res.json();
    })
  }

export function singUp (email, password) {
  return request ({
    url: '/signup',
    data: {email, password},
    method: "POST",
  })
}

export function checkToken (token) {
  return request ({
    url: '/users/me',
    method: "GET",
    token
  })
}

export function singIn (email, password) {
  return request ({
    url: '/signin',
    data: {email, password},
    method: "POST",
  })
}
