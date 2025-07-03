import {
  GET_PAGE_SECTION,
  GET_PAGE_SECTION_SUCCESS,
  GET_PAGE_SECTION_FAIL,
  PUT_PAGE_SECTION,
  PUT_PAGE_SECTION_SUCCESS,
  PUT_PAGE_SECTION_FAIL,
} from "./actionTypes";

export const getPageSection = (payLoad) => {
  return {
    type: GET_PAGE_SECTION,
    payLoad,
  };
};
export const getPageSectionSuccess = (payLoad) => {
  return {
    type: GET_PAGE_SECTION_SUCCESS,
    payLoad,
  };
};
export const getPageSectionFail = (payLoad) => {
  return {
    type: GET_PAGE_SECTION_FAIL,
    payLoad,
  };
};
//============================================================================

export const putPageSection = (payLoad) => {
  return {
    type: PUT_PAGE_SECTION,
    payLoad,
  };
};
export const putPageSectionSuccess = (payLoad) => {
  return {
    type: PUT_PAGE_SECTION_SUCCESS,
    payLoad,
  };
};
export const putPageSectionFail = (payLoad) => {
  return {
    type: PUT_PAGE_SECTION_FAIL,
    payLoad,
  };
};
