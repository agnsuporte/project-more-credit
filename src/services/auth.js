import JWT from "jsonwebtoken";

export const TOKEN_KEY = "@Gn-Token-Net-More";

export const logout = () => localStorage.clear();

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN_KEY) !== null;
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUserId = () => {
  const token = JWT.decode(getToken());
  return token.id ? token : null;
};

export const getUserName = () => {
  const token = JWT.decode(getToken());
  return token.name ? token : null;
};

export const getUserEmail = () => {
  const token = JWT.decode(getToken());
  return token.email ? token : null;
};
