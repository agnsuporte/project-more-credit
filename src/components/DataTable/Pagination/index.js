import React, { useEffect, useState, useMemo } from "react";

import "./pagination.css";

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0) {
      setTotalPages(Math.ceil(total / itemsPerPage));
    }
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    pages.push(
      <span className="pages" key="01xyz-54">
        Pag. {currentPage} de {totalPages}
      </span>
    );

    // for (let i = 1; i <= totalPages; i++) {
    //   const activePage = i === currentPage;
    //   pages.push(
    //     <button
    //       type="button"
    //       className={activePage ? "item active" : "item"}
    //       key={i}
    //       onClick={() => onPageChange(i)}
    //     >
    //       {i}
    //     </button>
    //   );
    // }

    return pages;
  }, [totalPages, currentPage]); //onPageChange

  if (totalPages === 0) return null;

  return (
    <div className="pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        className={currentPage === 1 ? "item not-active" : "item"}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {"<<"}
      </button>
      {paginationItems}
      <button
        type="button"
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? "item not-active" : "item"}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default PaginationComponent;
