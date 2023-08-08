"use client";

import { useSelector } from "react-redux";

export default function Pagination({ onPageChange, currentPage, pageSize }) {
  const { totalList } = useSelector((state) => {
    return state.products;
  });

  const onNextButton = () => {
    if (currentPage < pagesCount) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevButton = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const pagesCount = Math.ceil(totalList / pageSize); // 100 / 30
  return (
    <div className="flex justify-between" style={{ width: "10rem" }}>
      <button
        type="button"
        className="bg-green-700 px-4 py-1"
        onClick={onPrevButton}
      >
        Prev
      </button>
      <p className="text-center">
        {currentPage}/{pagesCount}
      </p>
      <button
        type="button"
        className="bg-green-700 px-4 py-1"
        onClick={onNextButton}
      >
        Next
      </button>
    </div>
  );
}
