"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilter,
  resetFilter,
  fetchSidebarFilter,
  setBrandFilter,
  setCategoryFilter,
} from "../../app/store/product-slice";

export default function Filters({ maxPrice, minPrice }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSidebarFilter());
  }, [dispatch]);

  const { brandList, categoryList } = useSelector((state) => {
    return state.sidebar;
  });

  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [brandOptFilter, setBrandOptFilter] = useState([]);
  const [categoryOptFilter, setCategoryOptFilter] = useState([]);
  const [isBrandFilterActive, setIsBrandFilterActive] = useState(false);
  const [isCategoryFilterActive, setIsCategoryFilterActive] = useState(false);

  useEffect(() => {
    setMaxPriceFilter(maxPrice);
    setMinPriceFilter(minPrice);
    setBrandOptFilter(brandList);
    setCategoryOptFilter(categoryList);
  }, [maxPrice, minPrice, brandList, categoryList]);

  const onSave = () => {
    if (isBrandFilterActive) {
      dispatch(setBrandFilter({ brandFilter: brandOptFilter }));
    }
    if (isCategoryFilterActive) {
      dispatch(setCategoryFilter({ categoryFilter: categoryOptFilter }));
    }

    dispatch(fetchFilter({ min: minPriceFilter, max: maxPriceFilter }));
  };

  const onReset = () => {
    dispatch(resetFilter());
  };

  const priceFilter = () => {
    return (
      <div className="relative text-black">
        <div className="text-lg font-semibold text-sky-500">Price Range:</div>
        <input
          className="bg-cyan-500 hover:bg-cyan-600 text-center rounded-sm"
          placeholder="min"
          value={minPriceFilter}
          onChange={(e) => setMinPriceFilter(e.target.value)}
        />
        <p className="text-center">to</p>
        <input
          className="bg-cyan-500 hover:bg-cyan-600 text-center rounded-sm"
          placeholder="max"
          value={maxPriceFilter}
          onChange={(e) => setMaxPriceFilter(e.target.value)}
        />
      </div>
    );
  };

  const brandFilter = () => {
    const handleOnChange = (e, index) => {
      let updateBrand = [...brandOptFilter];
      updateBrand.splice(index, 1, {
        title: e?.target?.value,
        checked: e?.target?.checked,
      });

      const toggleChecklist =
        updateBrand[index]?.checked === e?.target?.checked;
      setIsBrandFilterActive(toggleChecklist);
      setBrandOptFilter(updateBrand);
    };

    return (
      <div className="text-black">
        <div className="text-lg font-semibold text-sky-500">Brands:</div>
        <div className="h-36 overflow-auto">
          {brandOptFilter.map((item, index) => (
            <div key={index} className="flex">
              <input
                value={item?.title}
                type="checkbox"
                onChange={(e) => handleOnChange(e, index)}
                checked={item.checked}
              />
              <div className="pl-2">{item?.title}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const categoryFilter = () => {
    const handleOnChange = (e, index) => {
      let updateCategory = [...categoryOptFilter];
      updateCategory.splice(index, 1, {
        title: e?.target?.value,
        checked: e?.target?.checked,
      });
      const toggleChecklist =
        updateCategory[index]?.checked === e?.target?.checked;
      setIsCategoryFilterActive(toggleChecklist);
      setCategoryOptFilter(updateCategory);
    };

    return (
      <div className="text-black">
        <div className="text-lg font-semibold text-sky-500">Category:</div>
        <div className="h-36 overflow-auto">
          {categoryOptFilter.map((item, index) => (
            <div key={index} className="flex">
              <input
                value={item?.title}
                type="checkbox"
                onChange={(e) => handleOnChange(e, index)}
                checked={item.checked}
              />
              <div className="pl-2">{item?.title}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="w-48 m-auto flex flex-col gap-4 pt-4">
      {priceFilter()}
      {categoryFilter()}
      {brandFilter()}
      <div className="flex flex-col gap-2 pb-40">
        <button
          type="button"
          className="text-white bg-green-700 px-4 py-1 w-36 text-center rounded-sm"
          onClick={onSave}
        >
          Save
        </button>
        <button
          type="button"
          className="text-white bg-green-700 px-4 py-1 w-36 text-center rounded-sm"
          onClick={() => onReset()}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
