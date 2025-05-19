"use client"

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [focusSearch, setFocusSearch] = useState(false);
  const [mounted, setMounted] = useState(false); // <- Adicionado
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true); // <- Marca que está no client
  }, []);

  useEffect(() => {
    if (drawerOpen && focusSearch && searchInputRef.current) {
      searchInputRef.current.focus();
      setFocusSearch(false);
    }
  }, [drawerOpen, focusSearch]);

  const cartCount = 0;
  const favCount = 0;

  const drawerVariants = {
    closed: { x: "-100%", opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <header className="w-full bg-white border-b border-black/10 fixed top-0 left-0 z-50">
      <div className="md:max-w-6xl max-w-full mx-auto px-4 py-3 flex items-center md:justify-center justify-around gap-4">
        {/* Mobile: Hamburger à esquerda */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => {
            setDrawerOpen(true);
            setFocusSearch(false);
          }}
          aria-label="Abrir menu"
        >
          <motion.span
            animate={drawerOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25, duration: 0.13 }}
            className="block h-0.5 w-6 bg-black transition-transform"
          />
          <motion.span
            animate={drawerOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.09 }}
            className="block h-0.5 w-6 bg-black my-1 transition-opacity"
          />
          <motion.span
            animate={drawerOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25, duration: 0.13 }}
            className="block h-0.5 w-6 bg-black transition-transform"
          />
        </button>

        {/* Logo centralizado */}
        <span className=" text-xl font-bold tracking-tight text-black text-center md:text-left">
          <Link
            href={"/"}
            >
          <Image 
            src="/MainIconPng.png"
            alt="Logo da loja"
            width={100}
            height={40}
            className="h-10 w-auto"
            >
            
          </Image>
          </Link>
          
        </span>

        {/* Desktop: Barra de pesquisa centralizada */}
        <form className="flex-1 mx-6 max-w-xl relative hidden md:flex">
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full border border-black/20 bg-white text-black rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-black transition placeholder:text-gray-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-black rounded-full p-1 transition"
            aria-label="Buscar"
          >
            <FaSearch size={18} />
          </button>
        </form>

        {/* Desktop: Ícones de ação */}
        <div className="items-center gap-5 hidden md:flex">
          <div className="relative flex items-center cursor-pointer">
            <FaShoppingCart className="text-3xl text-black rounded-full p-1 transition" />
            <span className="ml-1 text-sm font-bold text-black">{cartCount}</span>
          </div>
          <div className="relative flex items-center cursor-pointer">
            <FaHeart className="text-3xl text-black rounded-full p-1 transition" />
            <span className="ml-1 text-sm font-bold text-black">{favCount}</span>
          </div>
          <a href="/conta" aria-label="Usuário" className="cursor-pointer">
            <FaUser className="text-3xl text-black rounded-full p-1 transition" />
          </a>
        </div>

        {/* Mobile: Ícones à direita */}
        <div className="flex items-center gap-0 md:gap-4 md:hidden">
          <button
            aria-label="Buscar"
            onClick={() => {
              setDrawerOpen(true);
              setFocusSearch(true);
            }}
            className="p-1"
          >
            <FaSearch size={18} className="text-2xl text-black" />
          </button>
          <a href="/carrinho" aria-label="Carrinho" className="relative flex items-center">
            <FaShoppingCart className="text-3xl text-black rounded-full p-1 transition" />
            <span className="ml-1 text-sm font-bold text-black">{cartCount}</span>
          </a>
          <a href="/conta" aria-label="Usuário">
            <FaUser className="text-3xl text-black rounded-full p-1 transition" />
          </a>
        </div>
      </div>

      {/* Drawer lateral mobile */}
      <AnimatePresence>
        {mounted && drawerOpen && (
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            transition={{ type: "tween", duration: 0.22 }}
            className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white shadow-lg z-[100] flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-black/10">
              <span className="text-xl font-bold text-black">Menu</span>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Fechar menu"
                className="p-2"
              >
                <FaTimes className="text-2xl text-black" />
              </button>
            </div>
            <form className="px-4 py-4 border-b border-black/10">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar produtos..."
                className="w-full border border-black/20 bg-white text-black rounded-full py-2 pl-4 pr-10 focus:outline-none focus:border-black transition placeholder:text-gray-500"
              />
              <button
                type="submit"
                className="absolute right-8 mt-2 top-1/2 -translate-y-1/2 text-black rounded-full p-1 transition"
                aria-label="Buscar"
                tabIndex={-1}
                style={{ right: 24, top: 36, position: "absolute" }}
              >
              </button>
            </form>
            <nav className="flex-1 px-4 py-4">
              <ul className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block py-2 px-2 text-black rounded hover:bg-black/5 transition"
                      onClick={() => setDrawerOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex gap-6 px-4 py-4 border-t border-black/10 justify-center">
              <a href="/carrinho" aria-label="Carrinho" className="relative flex items-center">
                <FaShoppingCart className="text-3xl text-black rounded-full p-1 transition" />
                <span className="ml-1 text-sm font-bold text-black">{cartCount}</span>
              </a>
              <a href="/favoritos" aria-label="Favoritos" className="relative flex items-center">
                <FaHeart className="text-2xl text-black" />
                <span className="ml-1 text-sm font-bold text-black">{favCount}</span>
              </a>
              <a href="/conta" aria-label="Usuário">
                <FaUser className="text-3xl text-black rounded-full p-1 transition" />
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay para fechar o drawer */}
      <AnimatePresence>
        {mounted && drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-[90]"
            onClick={() => setDrawerOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}