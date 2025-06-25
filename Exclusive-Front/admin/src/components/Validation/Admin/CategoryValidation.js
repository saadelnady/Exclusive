const initialValues = {
  image: "",
  previewImage: "",
  title: "",
};

const validate = (values) => {
  const errors = {};
  if (!values.image) {
    errors.image = "Category image is required";
  }

  if (!values.title) {
    errors.title = "Category title is required";
  } else if (values.title.length < 3) {
    errors.title = "Category title must be at least 3 characters";
  } else if (values.title.length > 20) {
    errors.title = "Category title must be less than 20 characters";
  }
  return errors;
};
export { initialValues, validate };
