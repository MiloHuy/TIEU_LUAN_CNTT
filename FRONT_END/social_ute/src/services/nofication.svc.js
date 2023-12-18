import AxiosInstance from "./axios-instance.svc";

export const API_NOFICATIONS_ENDPOINT = {
  GET: {
    me_nofications: "/me/notis",
  },
  POST: {
    read_nofication: "/me/notis/read/:id",
  },
};

export const getAllNofications = () => {
  const res = AxiosInstance.get(API_NOFICATIONS_ENDPOINT.GET.me_nofications);
  return res;
};

export const readNofications = () => {
  const res = AxiosInstance.post(API_NOFICATIONS_ENDPOINT.POST.read_nofication);
  return res;
};
