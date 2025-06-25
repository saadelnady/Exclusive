import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { serverUrl } from "../../API/API";
import { ProductOptions } from "./ProductOptions";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import ProductActionsButtons from "./ProductActionsButtons";

export const ProductCard = ({
  product,
  handleShowWarning,
  currentActionHandler,
}) => {
  return (
    <div className="product-details col-12 col-md-6 col-lg-7 bg-light rounded py-3">
      <h1 className="py-3 px-4 fw-bold">Product details</h1>
      <div className="d-flex pe-3 mb-3 justify-content-between">
        <div className="links d-flex align-items-center px-4 mb-2">
          <h3 className="fw-bold">{product?.category?.title}</h3>
          {product?.subCategory && (
            <>
              <MdOutlineKeyboardArrowRight className="fs-3" />
              <h3 className="fw-bold"> {product?.subCategory?.title}</h3>
            </>
          )}
        </div>
        {product?.isFlashSale && (
          <div className="d-flex justify-content-center flex-column">
            <h1 className="fw-bold">Flash Sale</h1>

            <h3>
              To <MdOutlineKeyboardArrowRight />
              {product?.flashSaleExpirationDate}
            </h3>
          </div>
        )}
      </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={4.5}
        navigation
        pagination={{ clickable: true }}
      >
        {product?.images?.map((img, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={`${serverUrl}/${img}`}
                alt="productImg"
                className="cursor-pointer w-100 rounded"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <h2 className="py-3 px-4 fs-1 fw-bold">{product?.title}</h2>
      <p className="pb-3 px-4 description fw-bold">{product?.description}</p>
      <ProductOptions options={product?.options} />
      <ProductActionsButtons
        product={product}
        handleShowWarning={handleShowWarning}
        currentActionHandler={currentActionHandler}
      />
    </div>
  );
};
