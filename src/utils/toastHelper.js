import { toast } from "react-toastify"

export const toastNotification = (message, status) => {
    toast(message, {
        position: "top-right",
        autoClose: 5000,
        type: status,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}