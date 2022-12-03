import { getLoginCredentialsFromLocalStorage } from "./localStorage";

export const checkToken = async (navigate, route) => {
  const credential = await getLoginCredentialsFromLocalStorage();
  return credential === null || credential.token === null ? navigate(route, { replace: true }) : true;
};
