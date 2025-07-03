import {
  GET_PAGE_SECTION,
  GET_PAGE_SECTION_FAIL,
  GET_PAGE_SECTION_SUCCESS,
  GET_PAGE_SECTIONS,
  GET_PAGE_SECTIONS_FAIL,
  GET_PAGE_SECTIONS_SUCCESS,
  PUT_PAGE_SECTION,
  PUT_PAGE_SECTION_FAIL,
  PUT_PAGE_SECTION_SUCCESS,
} from "@/store/actions/pageSections/actionTypes";

const initialState = {
  isLoading: false,
  error: null,
  section: {},
  sections: [],
};

const pageSectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAGE_SECTION:
      return { ...state, isLoading: true };

    case GET_PAGE_SECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        section: action?.payLoad,
        error: null,
      };

    case GET_PAGE_SECTION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    // ====================================================================================================

    case GET_PAGE_SECTIONS:
      return { ...state, isLoading: true };

    case GET_PAGE_SECTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sections: action?.payLoad?.sections,
        error: null,
      };

    case GET_PAGE_SECTIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };

    // ====================================================================================================
    case PUT_PAGE_SECTION:
      return {
        ...state,
        isLoading: true,
      };
    case PUT_PAGE_SECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        section: action?.payLoad,
        error: null,
      };

    case PUT_PAGE_SECTION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };
    default:
      return state;
  }
};

export { pageSectionsReducer };
