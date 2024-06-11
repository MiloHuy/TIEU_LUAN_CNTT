import { SSOCOOKIES } from "constants/app.const";
import { groupPermission } from "constants/group/permission.const";
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
  return (
    permission[category] &&
    permission[category][method].hasOwnProperty(endPoint)
  );
};

export const checkPermissionMethod = (permission, { action, role }) => {
  const { category, method, endPoint } = groupPermission[role]?.[action];

  const isValid = checkPermission(permission, category, method, endPoint);

  if (!isValid) return false;

  return permission[category][method][endPoint];
};
