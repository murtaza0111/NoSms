import {
  POSTS_KEY,
  FRIENDS_KEY,
  USERS_DATA_KEY,
  LOGIN_CREDENTIALS_KEY,
} from "../api";

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getfromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
function removefromLocalStorage(key) {
  localStorage.removeItem(key);
}

// SET User Credentials to Local Storage
export function setLoginCredentialsToLocalStorage(value) {
  return saveToLocalStorage(LOGIN_CREDENTIALS_KEY, value);
}
// get User Credetials From Local Storage
export function getLoginCredentialsFromLocalStorage() {
  return getfromLocalStorage(LOGIN_CREDENTIALS_KEY);
}
// get User Credetials From Local Storage
export function removeLoginCredentialsFromLocalStorage() {
  return removefromLocalStorage(LOGIN_CREDENTIALS_KEY);
}
// Add User To Local Storage
export function addUserToLocalStorage(value) {
  return saveToLocalStorage(USERS_DATA_KEY, value);
}
// Add User To Local Storage
export function getUsersFromLocalStorage(value) {
  return getfromLocalStorage(USERS_DATA_KEY);
}

// Posts
// set Posts To Local Storage
export function addPostsToLocalStorage(value) {
  return saveToLocalStorage(POSTS_KEY, value);
}
// get User Cart From Local Storage
export function getPostsFromLocalStorage() {
  return getfromLocalStorage(POSTS_KEY);
}
// Remove User Cart From Local Storage
export function  removePostsFromLocalStorage() {
  return removefromLocalStorage(POSTS_KEY);
}

// Friends
// set Posts To Local Storage
export function addFriendsToLocalStorage(value) {
  return saveToLocalStorage(FRIENDS_KEY, value);
}
// get User Cart From Local Storage
export function getFriendsFromLocalStorage() {
  return getfromLocalStorage(FRIENDS_KEY);
}
// Remove User Cart From Local Storage
export function  removeFriendsFromLocalStorage() {
  return removefromLocalStorage(FRIENDS_KEY);
}



// // set Posts To Local Storage
// export function setUserCartToLocalStorage(value) {
//   return saveToLocalStorage(USER_CART_PRODUCTS_KEY, value);
// }
// // get User Cart From Local Storage
// export function getUserCartFromLocalStorage() {
//   return getfromLocalStorage(USER_CART_PRODUCTS_KEY);
// }
// // Remove User Cart From Local Storage
// export function  removeUserCartFromLocalStorage() {
//   return removefromLocalStorage(USER_CART_PRODUCTS_KEY);
// }