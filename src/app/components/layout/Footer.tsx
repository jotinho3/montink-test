import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center text-center gap-4">
        <Image
          alt="Logo da loja"
          width={100}
          height={100}
          className="w-24 h-24 object-cover mb-4"
          src="/MainIconPng.png"
        >
          
        </Image>
        <nav className="flex flex-wrap justify-center gap-6 text-gray-600">
          <a href="/" className="hover:text-blue-600 transition">Início</a>
          <a href="/produtos" className="hover:text-blue-600 transition">Produtos</a>
          <a href="/sobre" className="hover:text-blue-600 transition">Sobre</a>
          <a href="/contato" className="hover:text-blue-600 transition">Contato</a>
        </nav>
        <div className="flex gap-4 mt-2">
          <a href="#" aria-label="Instagram" className="hover:text-blue-600 transition">
            <svg width="24" height="24" fill="none" stroke="currentColor" className="inline"><circle cx="12" cy="12" r="4"/><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M17 7h.01"/></svg>
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition">
            <svg width="24" height="24" fill="none" stroke="currentColor" className="inline"><path d="M18 2h-3a4 4 0 0 0-4 4v3H7v4h4v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z"/></svg>
          </a>
        </div>
        <span className="text-sm text-gray-400 mt-4">&copy; {new Date().getFullYear()} Sua Loja. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}