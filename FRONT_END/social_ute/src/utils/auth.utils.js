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
    permission[category][method] && permission[category][method].hasOwnProperty(endPoint)
  );
};

export const checkPermissionMethod = (permission, { action, role, manage }) => {
  const path = manage ? [role, manage, action] : [role, action];

  if (!path.reduce((acc, key) => acc && acc[key], groupPermission)) {
    return false;
  }

  const { category, method, endPoint } = path.reduce((acc, key) => acc[key], groupPermission);

  const isValid = checkPermission(permission, category, method, endPoint);

  return isValid ? permission[category][method][endPoint] : false;
};
