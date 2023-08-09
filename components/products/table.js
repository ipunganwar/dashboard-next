"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../app/store/product-slice";

export default function Table({ pageSize, skipSize }) {
  const router = useRouter();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts({ limit: pageSize, skip: skipSize }));
  }, [dispatch, pageSize, skipSize]);

  const { list, errorMsg } = useSelector((state) => {
    return state.products;
  });

  const [selectIndex, setSelectIndex] = useState("");

  const handleOnClick = (id) => {
    setSelectIndex(id);
    router.push(`/carts/${id}`);
  };

  if (!list.length) {
    return (
      <div className="text-center pt-8">
        <div className="border-2 py-36">{errorMsg}</div>
      </div>
    );
  } else {
    return (
      <div className="text-center pt-8">
        <table className="w-full">
          <thead>
            <tr className="border-2 text-2xl">
              <th>Product Name</th>
              <th>Brands</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {list.map((option, index) => (
              <tr
                key={index}
                className="border-2 text-base"
                onClick={() => handleOnClick(option?.id)}
                style={
                  selectIndex === option?.id ? { backgroundColor: "blue" } : {}
                }
              >
                <td>{option?.title}</td>
                <td>{option?.brand}</td>
                <td>{option?.price}</td>
                <td>{option?.stock}</td>
                <td>{option?.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
