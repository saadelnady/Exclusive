export const isObjectNotEmpty = (obj) => {
  return obj && Object.keys(obj).length !== 0;
};
export const handleImageLink = (image) => {
  if (image?.includes("http")) {
    return image;
  } else {
    // eslint-disable-next-line no-undef
    return `${import.meta.env.VITE_SERVER_URL}/${image}`;
  }
};
