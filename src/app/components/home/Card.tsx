import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  image: string;
  hoverImage?: string;
  title: string;
  price: string;
  discountBadge?: string;
  onAddToCart?: () => void;
  onFavorite?: () => void;
  cardClassName?: string;
}

// Função para gerar slug a partir do título
function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, "-");
}

export default function Card({
  image,
  hoverImage,
  title,
  price,
  discountBadge,
  onAddToCart,
  onFavorite,
  cardClassName,
}: CardProps) {
  const slug = slugify(title);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  function handleComprarClick(e: React.MouseEvent) {
    e.preventDefault();
    onAddToCart && onAddToCart();
    router.push(`/${slug}`);
  }

  return (
    <Link
      href={`/${slug}`}
      className={`md:w-full w-11/12 border border-black/10 rounded-lg shadow-sm flex flex-col overflow-hidden hover:shadow-md transition ${cardClassName} relative cursor-pointer group`}
      prefetch={false}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge de desconto */}
      {discountBadge && (
        <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1 rounded z-10 shadow">
          {discountBadge}
        </span>
      )}
      <div className="w-full md:h-48 h-40 relative min-h-18 max-h-18 md:max-h-40">
        <Image
          src={isHovered && hoverImage ? hoverImage : image}
          alt={title}
          fill
          className="object-cover transition-all duration-300"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <div className="md:p-4 p-2 flex-1 flex flex-col">
        <h3 className="md:text-base text-sm font-semibold text-black mb-2">{title}</h3>
        <span className="text-lg font-bold text-black md:mb-4 mb-0">{price}</span>
        <div className="mt-auto flex gap-2">
          <button
            className="flex-1 flex items-center cursor-pointer justify-center gap-2 border border-black/10 rounded px-2 py-1 text-black hover:bg-black hover:text-white transition"
            tabIndex={-1}
            type="button"
            onClick={handleComprarClick}
            aria-label="Comprar"
          >
            <FaShoppingCart />
            <p className="hidden md:block">Comprar</p>
          </button>
          <button
            className="p-2 rounded border border-black/10 text-black hover:bg-black hover:text-white transition"
            onClick={(e) => {
              e.preventDefault();
              onFavorite && onFavorite();
            }}
            aria-label="Favoritar"
            tabIndex={-1}
            type="button"
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </Link>
  );
}