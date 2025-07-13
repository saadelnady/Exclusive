import React from "react";
import { Pagination } from "react-bootstrap";
import styles from "./styles/styles.module.scss";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // نجهز قائمة أرقام الصفحات (ممكن نخليها ديناميكية)
  const paginationItems = [];

  // لو الصفحات كثيرة، نعرض صفحات حوالي currentPage فقط مع أزرار البداية والنهاية
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  // لو قربنا من البداية نزودها
  if (currentPage <= 3) {
    endPage = Math.min(5, totalPages);
  }

  // لو قربنا من النهاية نزودها
  if (currentPage >= totalPages - 2) {
    startPage = Math.max(totalPages - 4, 1);
  }

  for (let page = startPage; page <= endPage; page++) {
    paginationItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className={styles["pagination-custom"]}>
      <Pagination.First
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {startPage > 1 && <Pagination.Ellipsis disabled />}
      {paginationItems}
      {endPage < totalPages && <Pagination.Ellipsis disabled />}
      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default CustomPagination;
