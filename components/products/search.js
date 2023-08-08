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

  const handleOnClick = () => {
    if (searchKeyword.length > 0) {
      dispatch(fetchSearch({ param: searchKeyword }));
    } else {
      dispatch(fetchProducts({}));
    }
  };

  return (
    <div className="py-4 flex items-stretch justify-end">
      <input
        className="enabled:hover:border-gray-400 disabled:opacity-75 text-base text-green-600 text-center rounded-sm mr-2"
        placeholder="Search Product..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="text-white bg-green-700 px-4 w-30 py-1 text-center rounded-sm"
        onClick={handleOnClick}
      >
        Search
      </button>
    </div>
  );
}
