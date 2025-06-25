const initialValues = {
  title: "",
  value: "",
  minAmount: "",
  maxAmount: "",
  selectedProduct: "",
  couponCodeOwner: "",
};

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "title is required";
  }
  if (!values.value) {
    errors.value = "value is required";
  }
  if (!values.minAmount) {
    errors.minAmount = "Min amount is required";
  }
  if (!values.maxAmount) {
    errors.maxAmount = "Max amount is required";
  }
  if (!values.selectedProduct || values.selectedProduct === "select product") {
    errors.selectedProduct = "Selected product is required";
  }
  return errors;
};

export { initialValues, validate };
