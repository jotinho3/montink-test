'use client'

import React from "react";
import Carousel from "./Carousel";
import CardGrid from "./CardGrid";

const images = [
  { src: "/banner1.jpg", alt: "Banner 1" },
  { src: "/banner2.jpg", alt: "Banner 2" },
  { src: "/banner3.jpg", alt: "Banner 3" },
];

export default function HomeComponent() {
  return (
    <div className="w-full">
      <Carousel images={images} interval={5000} />
      <CardGrid />
      {/* Outros conteúdos da home podem ser adicionados aqui */}
    </div>
  );
}