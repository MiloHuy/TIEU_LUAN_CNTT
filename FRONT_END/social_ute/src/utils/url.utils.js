import { toast } from "react-toastify";

export const CopyURL = (post_id) => {
  const el = document.createElement("input");
  el.value = `http://localhost:8080/welcome/post/${post_id}`;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  console.log("el.value:" + el.value);

  toast.success("Sao chép đường dẫn thành công!!!", {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const navigateById = (id, path, navigate) => {
  navigate(`${path}/${id}`);
};
