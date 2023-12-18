import { USERCOOKIES } from "constants/user.const";
import Cookies from "js-cookie";

export function getUserIdFromCookie() {
  const userID = Cookies.get(USERCOOKIES.userID);
  return userID;
}

export function getUserNameFromCookie() {
  const userID = Cookies.get(USERCOOKIES.userName);
  return userID;
}

export function getUserAvatarFromCookie() {
  const userAvatar = Cookies.get(USERCOOKIES.userAvatar);
  return userAvatar;
}

export const getFullName = (firstName, lastName) => {
  return [firstName, lastName].join(" ");
};
