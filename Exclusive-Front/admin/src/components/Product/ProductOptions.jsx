import React from "react";

export const ProductOptions = ({ options }) => {
  return (
    <div className="product-options mb-5">
      <table className="col-12 text-center">
        <thead>
          <tr>
            <th rowSpan="2">Color</th>
            <th rowSpan="2">Size</th>
            <th colSpan="4">Price</th>
            <th rowSpan="2">Stock Count</th>
          </tr>
          <tr>
            <th>Price before discount</th>
            <th>Discount percentage</th>
            <th>Discount Value</th>
            <th>Final price</th>
          </tr>
        </thead>
        <tbody>
          {options?.map((option, index) => {
            return (
              <tr key={index}>
                <td>
                  <span
                    className="product-color "
                    style={{
                      backgroundColor: option?.color,
                      border: "1px solid red",
                    }}
                  ></span>
                </td>
                <td>{option?.size || "__"}</td>
                <td>{`${
                  option?.price?.priceBeforeDiscount
                    ? `${option?.price?.priceBeforeDiscount} $`
                    : "__"
                }`}</td>
                <td>
                  {`${
                    option?.price?.discountPercentage
                      ? `${option?.price?.discountPercentage} %`
                      : "__"
                  }`}
                </td>
                <td>
                  {`${
                    option?.price?.discountValue
                      ? `${option?.price?.discountValue} $`
                      : "__"
                  }`}
                </td>
                <td>
                  {`${
                    option?.price?.finalPrice
                      ? `${option?.price?.finalPrice} $`
                      : "__"
                  }`}
                </td>

                <td>{option?.stockCount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
