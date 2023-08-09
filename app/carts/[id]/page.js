"use client";

import { useEffect, useState } from "react";

export default function Carts({ params }) {
  const [detailPage, setDetailPage] = useState({});

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/${params?.id}`,
      );
      const result = await response.json();
      setDetailPage(result);
    };
    fetchDetail();
  }, [params?.id]);
  return (
    <div className="flex flex-col mx-8 overflow-auto">
      <div className="text-center text-2xl font-bold py-8">Carts Details</div>
      <div className="border-2 bg-blue-200 text-black text-left flex flex-col gap-4">
        <div>Title: {detailPage?.title}</div>
        <div>Brand: {detailPage?.brand}</div>
        <div>Description: {detailPage?.description}</div>
        <div>Price: {detailPage?.price}</div>
        <div>Rating: {detailPage?.rating}</div>
        <div>Stock: {detailPage?.stock}</div>
        <div>Discount: {detailPage?.discountPercentage}%</div>
      </div>
    </div>
  );
}
