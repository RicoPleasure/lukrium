"use client"

import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const PriceForm: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Use optional chaining in case no file is selected
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formattedProductName = productName.replace(/ /g, "+");
      const formattedProductDescription = productDescription.replace(/ /g, "+");

      const response = await fetch(
        `http://localhost:8000/generate_price?product_name=${formattedProductName}&product_description=${formattedProductDescription}`
      );
      const data = await response.json();

      if (response.ok) {
        setEstimatedPrice(parseFloat(data.ai_analysis));
        setError(null);
      } else {
        setError(data.error || "Erro ao calcular o preço.");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor.");
    }
  };

  return (
    <section className="flex items-center justify-center gap-28">
      <div className="flex flex-col gap-5">

        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-14">
                <div className="flex flex-col gap-1 items-start justify-center">
                <span>PRODUTO</span>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="focus:outline-none w-[380px] h-16 border-2 border-coral rounded-lg px-4"
                    required
                />
                </div>

                <div className="flex flex-col gap-1 items-start justify-center">
                  <span>DESCRIÇÃO</span>
                  <textarea
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      className="focus:outline-none resize-none w-[380px] h-52 border-2 border-coral rounded-lg p-4 align-text-top"
                      required
                  />
                </div>

                <button
                type="submit"
                className="w-40 h-12 text-center bg-[#FFC2C2] rounded-xl hover:bg-coral hover:text-white transition-all active:scale-95 ease-in-out duration-300 cursor-pointer"
                >
                CONFIRMAR
                </button>
            </div>
        </form>

        {error && <p className="text-red-500">{error}</p>}
        {estimatedPrice !== null && (
        <p className="text-green-500 font-bold">Preço Estimado: {estimatedPrice}</p>
        )}
      </div>

      <div className={`flex justify-center items-center ${ !image ? "border-4 rounded-xl border-dashed" : ""} h-[452px] w-[480px]`}>
        {image ? (
          <img
            src={image}
            alt="Uploaded Image"
            className="w-full h-full object-cover rounded-xl opacity-80 inset-shadow-2xs"
          />
        ) : (
          <label className="flex justify-center duration-300 ease-in-out transition-all h-full w-full flex-col items-center gap-3 cursor-pointer hover:bg-coral/10">
            <PlusIcon className="h-12 w-12" />
            <span>Adicionar Imagem</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        )}
      </div>
      
    </section>
  );
};

export default PriceForm;
