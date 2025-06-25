const initialValues = {
  image: "",
  previewImage: "",
  title: "",
  category: "",
};

const validate = (values) => {
  const errors = {};
  if (!values.image) {
    errors.image = "Subcategory image is required";
  }

  if (!values.category) {
    errors.category = "Category is required";
  }

  if (!values.title) {
    errors.title = "Subcategory title is required";
  } else if (values.title.length < 3) {
    errors.title = "Subcategory title must be at least 3 characters";
  } else if (values.title.length > 20) {
    errors.title = "Subcategory title must be less than 20 characters";
  }
  return errors;
};

export { initialValues, validate };
