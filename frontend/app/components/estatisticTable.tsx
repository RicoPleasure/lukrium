'use client'

import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { useState } from 'react';


interface Produto {
    name: string;
    price: number;
    sales: number;
}

const EstatisticTable = () => {

    
    const data = [
        { name: "Produto 1", price: 10.99, sales: 100 },
        { name: "Produto 2", price: 20.99, sales: 200 },
        { name: "Produto 3", price: 30.99, sales: 300 },
        { name: "Produto 4", price: 40.99, sales: 400 },
        { name: "Produto 5", price: 50.99, sales: 500 },
        { name: "Produto 6", price: 60.99, sales: 600 },
        { name: "Produto 7", price: 70.99, sales: 700 }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    console.log(currentPage)

    const itemsPerPage = 7;

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, 100));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);
    
  return (
    <div className='10 px-12'>
        <h1 className="text-4xl text-coral font-bold">Estatísticas</h1>

        <div className="flex flex-col text-white overflow-x-auto w-full h-[500px] gap-1 mt-10">
            {data.map((produto: Produto, index: number) => (
                <div className={`flex px-9 items-center gap-56 h-16 ${index % 2 == 0 ? "bg-coral/80" : "bg-coral/60"}  rounded-2xl`} key={index}>
                    <p className='font-bold text-xl flex-1'>{produto.name}</p>
                    <p>{produto.price}€</p>
                    <p>{produto.sales}</p>
                </div>
            ))}
        </div>
        
        <div className='flex px-3 gap-5'>
            <ChevronDoubleLeftIcon onClick={handlePrevPage} className='border-2 border-coral rounded-lg h-9 w-9 transition-all duration-300 ease-in-out cursor-pointer hover:bg-coral hover:text-white p-1 active:scale-90'/>
            <ChevronDoubleRightIcon onClick={handleNextPage} className='border-2 border-coral rounded-lg h-9 w-9 transition-all  duration-300 ease-in-outcursor-pointer hover:bg-coral hover:text-white p-1 cursor-pointer active:scale-90'/>
        </div>

    </div>
  )
}

export default EstatisticTable