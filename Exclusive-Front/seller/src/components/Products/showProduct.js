import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Shared/loading";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";

import IcError from "./assets/images/svgs/ic-error.svg";
import { postData } from "@/API/API";
import { toast } from "react-toastify";
import {
  editCategory,
  fetchCategory,
} from "@/store/actions/categories/categoriesActions";

import styles from "./styles/styles.module.scss";

const ShowProduct = () => {
  const { categoryId } = useParams();

  const { category, isLoading } = useSelector(
    (state) => state.categoriesReducer
  );

  if (isLoading) return <Loading />;

  return (
    <div className={`page ${styles.addNewCategory}`}>
      <div className="page-header">
        <div className="text">
          <h4 className="page-title">
            <FormattedMessage id="editCategory" />
          </h4>
          <p className="page-description">
            <FormattedMessage id="editCategoryDescription" /> :
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
