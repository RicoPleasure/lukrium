"use client";

import {
  ArrowDownLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useState, useEffect } from "react";

interface Produto {
  id: number;
  product_dsc: string;
  product_shor_dsc: string;
  _20231226: number;
}

const ReviewTable = () => {
  const [data, setData] = useState<Produto[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/generate_risky_products")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;
  const maxPage = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, maxPage));
  };

  return (
    <div className="10 px-12">
      <h1 className="text-4xl text-coral font-bold">Estatísticas</h1>

      <div className="flex flex-col text-white overflow-x-auto w-full h-[500px] gap-1 mt-10">
        {data &&
          data.slice(startIndex, endIndex).map((produto: Produto, index) => (
            <div
              className={`flex px-9 items-center gap-56 h-16 ${index % 2 == 0 ? "bg-coral/80" : "bg-coral/60"}  rounded-2xl`}
              key={index}
            >
              <p className="font-bold text-xl flex-1">{produto.product_dsc}</p>

              <span
                className={
                  produto._20231226 < 0.9 && produto._20231226 > 0.8
                    ? "text-yellow-500"
                    : "text-red-500"
                }
              >
                <ArrowDownLeftIcon className="h-6 w-6 text-coral" />
                <p>{produto._20231226}</p>
              </span>
            </div>
          ))}
      </div>

      {data.length > 0 && (
        <div className="flex px-3 gap-5">
          <ChevronDoubleLeftIcon
            onClick={handlePrevPage}
            className="border-2 border-coral rounded-lg h-9 w-9 transition-all duration-300 ease-in-out cursor-pointer hover:bg-coral hover:text-white p-1 active:scale-90"
          />
          <ChevronDoubleRightIcon
            onClick={handleNextPage}
            className="border-2 border-coral rounded-lg h-9 w-9 transition-all  duration-300 ease-in-outcursor-pointer hover:bg-coral hover:text-white p-1 cursor-pointer active:scale-90"
          />
        </div>
      )}
    </div>
  );
};

export default ReviewTable;
