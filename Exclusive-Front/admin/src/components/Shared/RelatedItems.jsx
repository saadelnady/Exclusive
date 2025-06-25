import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import Loading from "./loading";
import ProductsSlider from "../Admin/Shared/ProductsSlider/ProductsSlider";
import SpecialHeading from "./SpecialHeading";

const RelatedItems = ({ categoryId, subCategoryId }) => {
  const { flashSalesProducts, isLoading } = useSelector(
    (state) => state.productReducer
  );
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const dispatch = useDispatch();

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex < flashSalesProducts.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : flashSalesProducts.length - 1
    );
  };

  useEffect(() => {
    // dispatch(getRelatedProducts(categoryId, subCategoryId));
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="py-5 mb-5">
          <SpecialHeading
            title="Related Items"
            onNextSlide={handleNextSlide}
            onPrevSlide={handlePrevSlide}
          />
          <ProductsSlider
            products={flashSalesProducts}
            currentSlideIndex={currentSlideIndex}
          />
        </div>
      )}
    </>
  );
};
export default RelatedItems;
