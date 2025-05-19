'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselProps {
  images: { src: string; alt: string }[];
  interval?: number; // em ms
}

export default function Carousel({ images, interval = 5000 }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 para esquerda, 1 para direita

  // Troca automática de slides
  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection(1);
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, interval);
    return () => clearTimeout(timer);
  }, [current, images.length, interval]);

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute" as const,
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative" as const,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "35vh", minHeight: 200, maxHeight: 400 }}
    >
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={images[current].src}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          className="w-full h-full"
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Image
            src={images[current].src}
            alt={images[current].alt}
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="100vw"
            className="transition-all duration-500"
          />
        </motion.div>
      </AnimatePresence>
      {/* Controls */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl text-white cursor-pointer transition z-10"
        onClick={prev}
        aria-label="Anterior"
        style={{ background: "none" }}
      >
        <FaChevronLeft />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl text-white cursor-pointer transition z-10"
        onClick={next}
        aria-label="Próximo"
        style={{ background: "none" }}
      >
        <FaChevronRight />
      </button>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${current === idx ? "bg-gray-700" : "bg-white"}`}
            onClick={() => {
              setDirection(idx > current ? 1 : -1);
              setCurrent(idx);
            }}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}