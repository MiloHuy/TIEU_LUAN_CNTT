import { SSOCOOKIES } from "constants/app.const";
import Cookies from "js-cookie";

export function getAccessTokenFromCookie() {
  const access_token = Cookies.get(SSOCOOKIES.access);
  return access_token;
}

export function getRefreshTokenFromCookie() {
  const refresh_token = Cookies.get(SSOCOOKIES.refresh);
  return refresh_token;
}

export const checkPermission = (permission, category, method, endPoint) => {
  return permission[category][method].hasOwnProperty(endPoint);
};
