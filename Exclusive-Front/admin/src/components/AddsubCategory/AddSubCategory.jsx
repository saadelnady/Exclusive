import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MdError } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import Loading from "../Shared/loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { serverUrl } from "../../API/API";
import { fetchCategories } from "../../store/actions/category/categoryActions";

import {
  initialValues,
  validate,
} from "../Validation/Admin/SubCategoryValidation";

import {
  addSubCategory,
  editSubCategory,
  fetchSubCategory,
} from "../../store/actions/subCategory/subCategoryActions";
import CustomeTitle from "../Shared/CustomeTitle";

const AddSubCategory = () => {
  const { categories } = useSelector((state) => state.categoryReducer);
  const { isLoading, subCategory } = useSelector(
    (state) => state.subCategoryReducer
  );
  const { subCategoryId } = useParams();
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validate,
  });

  const handleSubmit = (values) => {
    if (subCategoryId) {
      handleEditSubCategory(values);
    } else {
      handleAddSubCategory(values);
    }
  };
  // ================================================================================

  useEffect(() => {
    if (subCategoryId) {
      dispatch(fetchSubCategory(subCategoryId));
    } else {
      formik.setValues({
        title: "",
        image: "",
        previewImage: "",
        category: categories[0]?._id,
      });
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (subCategory && subCategoryId) {
      formik.setValues({
        title: subCategory.title,
        image: subCategory.image,
        previewImage: `${serverUrl}/${subCategory.image}`,
        category: subCategory?.category?._id,
      });
    } else {
      formik.setValues({
        title: "",
        image: "",
        previewImage: "",
        category: categories[0]?._id,
      });
    }
  }, [subCategory, subCategoryId]);

  useEffect(() => {
    dispatch(fetchCategories());
    formik.setValues({
      ...formik.values,
      category: categories[0]?._id,
    });
  }, []);

  // ================================================================================
  const handleEditSubCategory = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("image", values.image);
    formData.append("category", values.category);
    setPreviewImage("");
    const payload = { formData, toast, subCategoryId };
    dispatch(editSubCategory(payload));
    resetForm();
  };
  // ================================================================================

  const handleAddSubCategory = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("image", values.image);
    formData.append("category", values.category);
    setPreviewImage("");
    const payload = { formData, toast };
    dispatch(addSubCategory(payload));
    resetForm();
  };
  // ================================================================================

  const resetForm = () => {
    formik.resetForm();
    setPreviewImage("");
    document.getElementById("categoryTitle").value = "";
    setTimeout(() => {
      navigate("/admin/subCategories");
    }, 2000);
  };

  // ================================================================================
  const handleImageChange = (event) => {
    const imageFile = event.currentTarget.files[0];

    event.currentTarget.value = null;

    // Set preview image

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        setPreviewImage(imageDataURL);
        formik.setFieldValue("image", imageFile);
        formik.setFieldValue("previewImage", imageDataURL); // Assigning imageDataURL directly, no need to use previewImage state
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("image", null);
    formik.setFieldValue("previewImage", null);
    document.getElementById("subCategoryImage").value = null; // Reset the input field
    setPreviewImage(""); // Reset the preview image
  };

  return (
    <div className="vh-100 bg-light py-5">
      <div className="container addsubcategory">
        <div className="d-flex justify-content-between align-items-center flex-wrap px-3 py-2 shadow">
          <CustomeTitle
            title={subCategoryId ? "Edit Subcategory " : "Add New Subcategory"}
          />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          action="POST"
          className="special-form"
        >
          <div className="my-3 image-wrapper">
            <label htmlFor="subCategoryImage">
              {formik.values.previewImage ? (
                <div className="subCategoryImage" id="subCategoryImage">
                  <img
                    src={formik.values.previewImage}
                    alt="subCategoryImage"
                  />
                </div>
              ) : (
                <div className="add-img">
                  <CiCamera />
                </div>
              )}
            </label>

            <input
              type="file"
              id="subCategoryImage"
              className="d-none"
              name="image"
              accept="image/*"
              onBlur={formik.handleBlur}
              onChange={handleImageChange}
            />
            {formik.values.previewImage && (
              <button
                type="button"
                className="btn btn-secondary remove-img"
                onClick={handleRemoveImage}
              >
                X
              </button>
            )}
          </div>
          {formik.touched.image && formik.errors.image ? (
            <p>
              <MdError className="fs-3 me-2" />
              {formik.errors.image}
            </p>
          ) : null}
          <input
            type="text"
            id="categoryTitle"
            placeholder="Subcategory title"
            className="form-control mb-3"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? (
            <p>
              <MdError className="fs-3 me-2" />
              {formik.errors.title}
            </p>
          ) : null}

          <select
            name="category"
            id="category"
            onChange={formik.handleChange}
            value={formik.values.category}
          >
            {categories?.map((category, index) => {
              return (
                <option key={index} value={category?._id}>
                  {category.title}
                </option>
              );
            })}
          </select>

          {formik.touched.category && formik.errors.category ? (
            <p>
              <MdError className="fs-3 me-2" />
              {formik.errors.category}
            </p>
          ) : null}
          <button type="submit" className="btn btn-danger">
            {isLoading ? (
              <Loading />
            ) : subCategoryId ? (
              "Edit Subcategory"
            ) : (
              "Add Subcategory"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddSubCategory;
