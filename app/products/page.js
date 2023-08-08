"use client";

import { useState } from "react";

import Table from "../../components/products/table";
import Search from "../../components/products/search";
import Pagination from "../../components/products/pagination";
import FilterTag from "../../components/products/filterTag";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [skipSize, setSkipSize] = useState(0);
  const pageSize = 30;

  const onPageChange = (page) => {
    setCurrentPage(page);
    calculateSkipSize(page);
  };

  const calculateSkipSize = (page) => {
    if (page === 1) {
      setSkipSize(0);
    } else {
      setSkipSize(pageSize * (page - 1));
    }
  };

  return (
    <div className="flex flex-col mx-8 overflow-auto">
      <Search />
      <FilterTag />
      <Table pageSize={pageSize} skipSize={skipSize} />
      <div className="flex justify-end py-8">
        <Pagination
          onPageChange={onPageChange}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
}
