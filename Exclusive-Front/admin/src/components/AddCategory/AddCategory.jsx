import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  initialValues,
  validate,
} from "../Validation/Admin/CategoryValidation";
import { toast } from "react-toastify";

import { MdError } from "react-icons/md";
import { CiCamera } from "react-icons/ci";

import "./styles/AddCategory.css";
import {
  addCategory,
  editCategory,
  fetchCategory,
} from "../../store/actions/category/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../API/API";
import Loading from "../Shared/loading";
import CustomeTitle from "../Shared/CustomeTitle";

const AddCategory = () => {
  const { isLoading, category } = useSelector((state) => state.categoryReducer);
  const { categoryId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleSubmition(values);
    },
    validate,
  });

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategory(categoryId));
    } else {
      formik.setValues({
        title: "",
        image: "",
        previewImage: "",
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (category && categoryId) {
      formik.setValues({
        title: category.title,
        image: category.image,
        previewImage: `${serverUrl}/${category.image}`,
      });
    } else {
      formik.setValues({
        title: "",
        image: "",
        previewImage: "",
      });
    }
  }, [category, categoryId]);

  const handleSubmition = (values) => {
    if (categoryId) {
      handleEditCategory(values);
    } else {
      handleAddCategory(values);
    }
  };

  const handleAddCategory = (values) => {
    const formData = new FormData();
    formData.append("title", values?.title);
    formData.append("image", values?.image);

    setPreviewImage("");
    const payload = { formData, toast };
    dispatch(addCategory(payload));
    resetForm();
  };

  const handleEditCategory = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("image", values.image);
    const payload = { categoryId, formData, toast };
    dispatch(editCategory(payload));
    resetForm();
  };

  const resetForm = () => {
    formik.resetForm();
    setPreviewImage("");
    document.getElementById("categoryTitle").value = "";
    setTimeout(() => {
      navigate("/admin/Categories");
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
    document.getElementById("CategoryImage").value = null; // Reset the input field
    setPreviewImage(""); // Reset the preview image
  };

  return (
    <div className="vh-100 bg-light py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center flex-wrap px-3 py-2 shadow">
          <CustomeTitle
            title={categoryId ? "Edit Category " : "Add New Category"}
          />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          action="POST"
          className="special-form"
        >
          <div className="my-3 image-wrapper">
            <label htmlFor="CategoryImage">
              {formik.values.previewImage ? (
                <div className="CategoryImage" id="CategoryImage">
                  <img src={formik.values.previewImage} alt="Category" />
                </div>
              ) : (
                <div className="add-img">
                  <CiCamera />
                </div>
              )}
            </label>

            <input
              type="file"
              id="CategoryImage"
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
            placeholder="Category title"
            className="form-control mb-3 w-50"
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
          <button type="submit" className="btn btn-danger">
            {isLoading ? (
              <Loading />
            ) : categoryId ? (
              "Edit Category"
            ) : (
              "Add Category"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddCategory;
