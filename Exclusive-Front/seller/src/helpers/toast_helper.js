export const showToast = (toast, message, type) => {
  if (type === "success") {
    return toast.success(message);
  }
  return toast.error(message);
};
