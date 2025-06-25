import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import "./styles/SpecialHeading.css";
import CustomeTitle from "./CustomeTitle";
const SpecialHeading = ({ title, SectionTitle, onNextSlide, onPrevSlide }) => {
  return (
    <div className="special-heading mb-5">
      <CustomeTitle title={title} />
      <div className="row flex-wrap align-items-center justify-content-between pt-5">
        <h1 className="fw-bold col-12 col-md-6 ">{SectionTitle}</h1>
        <div className="buttons mb-3 mb-md-0 d-none d-md-flex justify-content-end col-12 col-md-2">
          <button onClick={onPrevSlide} className="btn ">
            <FaArrowLeft className="fs-3" />
          </button>
          <button onClick={onNextSlide} className="btn">
            <FaArrowRight className="fs-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialHeading;
