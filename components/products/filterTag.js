"use client";

import { useSelector } from "react-redux";

export default function FilterTag() {
  const { tag } = useSelector((state) => {
    return state.filter;
  });

  const brandTagOption = () => {
    return (
      <div className="flex text-black">
        {tag.length > 0 &&
          tag.map((opt, index) => (
            <div key={index} className="px-4 py-2 bg-teal-300 ml-2 rounded-2xl">
              {opt}
            </div>
          ))}
      </div>
    );
  };

  return <div>{brandTagOption()}</div>;
}
