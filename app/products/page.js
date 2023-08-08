"use client";

import { useState } from "react";

import Table from "../../components/products/table";
import Search from "../../components/products/search";
import Pagination from "../../components/products/pagination";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [skipSize, setSkipSize] = useState(0);
  const pageSize = 10;

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
    <div className="w-screen flex flex-col">
      <Search />
      <Table pageSize={pageSize} skipSize={skipSize} />
      <Pagination
        onPageChange={onPageChange}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </div>
  );
}
