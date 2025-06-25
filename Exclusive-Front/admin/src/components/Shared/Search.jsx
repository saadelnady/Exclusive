import { useState } from "react";
// import { CiSearch } from "react-icons/ci";

import "./styles/Search.css";
// import SearchResults from "../Admin/Shared/Header/SearchResults";
import { useSelector } from "react-redux";

const Search = ({ action }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchedProducts } = useSelector((state) => state.productReducer);
  const [isShown, setIsShown] = useState(false);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    handleIsShown();
    setTimeout(() => {
      if (action) {
        action(searchTerm);
      }
    }, 500);
  };
  const handleIsShown = () => {
    setIsShown(!isShown);
  };
  return (
    <div className="search-wrapper position-relative col-12 col-lg-5 my-2 my-lg-0 ">
      <input
        type="text"
        className="form-control bg-light special-input"
        placeholder="what are you looking for ?"
        onChange={handleSearch}
        value={searchTerm}
      />
      {/* <CiSearch className="bi bi-search position-absolute top-50 fs-5 fw-bold end translate-middle" /> */}
      {/* {isShown && searchedProducts && searchedProducts.length > 0 ? (
        <SearchResults
          products={searchedProducts}
          handleIsShown={handleIsShown}
        />
      ) : null} */}
    </div>
  );
};
export default Search;
