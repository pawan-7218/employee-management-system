export const getRole = () => {
  return localStorage.getItem("role");
};

export const isAdmin = () => {
  return getRole() === "ADMIN";
};