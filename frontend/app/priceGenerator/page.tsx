import Image from "next/image";
import PriceForm from "../components/priceForm";

export default function PriceGenerator() {
  return (
    <section className="flex flex-col gap-6">
      <PriceForm/>
      <div className="flex flex-col gap-2 justify-start items-end w-full h-36">
        <p>PREÇO SUGERIDO:</p>
        <p className="font-bold text-9xl">1.29€</p>
      </div>
    </section>
  );
}
