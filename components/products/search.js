"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSearch, fetchProducts } from "../../app/store/product-slice";

export default function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useDispatch();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchKeyword.length > 0) {
        dispatch(fetchSearch({ param: searchKeyword }));
      } else {
        dispatch(fetchProducts({}));
      }
    }
  };

  return (
    <div className="py-4">
      <input
        className="enabled:hover:border-gray-400 disabled:opacity-75 text-base text-green-600"
        placeholder="Search Product"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
