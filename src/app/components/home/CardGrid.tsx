import React from "react";
import Card from "./Card";
import { MOCK_PRODUCTS } from "@/app/mock/mockProducts";


export default function CardGrid() {
  return (
    <div className="w-full mt-8 mb-8 px-2 py-2">
      <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-0 md:gap-4 w-full md:max-w-7xl mx-auto">
        {MOCK_PRODUCTS.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            hoverImage={product.hoverImage}
            title={product.title}
            price={product.price}
            discountBadge="-20%"
            cardClassName="aspect-[3/4] md:min-h-[320px] min-h-[200px]"
          />
        ))}
      </section>
    </div>
  );
}