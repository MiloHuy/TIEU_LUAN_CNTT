import DoanInstance from "./doan-instance.svc";

export const API_USER_ENDPOINT = {
  POST: {
    create_account: "/api/v1/admin/users",
  },
};

export const createAccount = async (payload) => {
  const res = DoanInstance.post(API_USER_ENDPOINT.POST.create_account, payload);
  return res;
};
