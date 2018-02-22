// const API_ID = process.env.REACT_APP_API_ID
// const APP_KEY = process.env.REACT_APP_APP_KEY
const BASE_URL = 'http://localhost:3001';


const AUTH_HEADER = {
  'Authorization': 'AUTH-TOKEN'
};

export function fetchPosts() {
  return fetch(`${BASE_URL}/posts`, {headers: AUTH_HEADER})
    .then((res) => res.json())
}

export function fetchPostDetails(id) {
  if (id) {
    return fetch(`${BASE_URL}/posts/${id}`, {headers: AUTH_HEADER})
      .then((res) => res.json())
  }
}


export function fetchPostComments(id) {
  if (id) {
    return fetch(`${BASE_URL}/posts/${id}/comments`, {headers: AUTH_HEADER})
      .then((res) => res.json())
  }
}


