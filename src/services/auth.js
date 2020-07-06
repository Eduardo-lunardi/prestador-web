export const TOKEN_KEY = "token";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const NOME = "nome";
export const ROLES = "roles";
export const ID = "id";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const login = obj => {
  localStorage.setItem(TOKEN_KEY, obj.token);
  localStorage.setItem(NOME, obj.nome)
  localStorage.setItem(ROLES, obj.roles)
  localStorage.setItem(ID, obj.prest_id)

  if (obj.refreshToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, obj.refreshToken);


};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};