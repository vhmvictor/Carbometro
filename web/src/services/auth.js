export const isAuthenticated = () => localStorage.getItem("user-token") !== null;
export const getToken = () => localStorage.getItem("user-token");

export const login = (token) => {
  localStorage.setItem("user-token", token);
};

export const logout = () => {
  localStorage.removeItem("user-token");
  sessionStorage.removeItem("user-id");
  sessionStorage.removeItem("blood-id");
};

export const setId = (userId) => {
  sessionStorage.setItem("user-id", userId);
};

export const getId = () => sessionStorage.getItem("user-id");

export const setBloodId = (bloodId) => {
  sessionStorage.setItem("blood-id", bloodId);
};

export const getBloodId = () => sessionStorage.getItem("blood-id");


