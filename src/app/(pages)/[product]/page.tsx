"use client";

import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import { MOCK_PRODUCTS } from "@/app/mock/mockProducts";
import useSessionWithExpiry from "@/app/hooks/useSessionWithExpiry";

// Função para gerar slug a partir do título
function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function SingleProductPage() {
  const params = useParams();
  const slug =
    typeof params.product === "string"
      ? params.product
      : Array.isArray(params.product)
      ? params.product[0]
      : "";

  // Busca o produto pelo slug
  const product = MOCK_PRODUCTS.find((p) => slugify(p.title) === slug);

  if (!product) {
    notFound();
  }

  // Usa as informações do produto mock (com variantes, descrição, images, etc)
  const { title, price, description, images, variants } = product;

  // Session keys
  const sessionKey = `product-session-${slug}`;

  // Hook customizado para sessionStorage
  const session = useSessionWithExpiry();

  // Recupera sessão ao montar
  const [mainImg, setMainImg] = useState(images?.[0] || "");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [cep, setCep] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [cepResult, setCepResult] = useState<{
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
  } | null>(null);
  const [cepError, setCepError] = useState<string | null>(null);

  useEffect(() => {
    const sessionData = session.get(sessionKey);
    if (sessionData) {
      setCep(sessionData.cep || "");
      setSelectedSize(sessionData.selectedSize || null);
      setSelectedColor(sessionData.selectedColor || null);
      setCepResult(sessionData.cepResult || null);
    }
    // eslint-disable-next-line
  }, [sessionKey]);

  useEffect(() => {
    session.set(
      sessionKey,
      { cep, selectedSize, selectedColor, cepResult },
      15
    );
  }, [cep, selectedSize, selectedColor, cepResult, sessionKey, session]);

  async function handleCepSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCepError(null);
    setCepResult(null);

    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) {
      setCepError("Digite um CEP válido com 8 dígitos.");
      return;
    }
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();
      if (data.erro) {
        setCepError("CEP não encontrado.");
        setCepResult(null);
      } else {
        setCepResult(data);
      }
    } catch {
      setCepError("Erro ao consultar o CEP.");
    }
    setCepLoading(false);
  }

  return (
    <div className="bg-gray-50 flex flex-col items-center py-10 px-2 font-sans py-30">
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-2 text-black hover:text-blue-700 font-medium transition text-base"
      >
        <FaChevronLeft className="text-lg" />
        Voltar para Home
      </Link>
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Imagens */}
        <div className="md:w-[35%] w-full flex flex-col items-center p-6 bg-gray-100">
          <motion.div
            key={mainImg}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full aspect-[3/4] relative rounded-xl overflow-hidden shadow"
          >
            <Image
              src={mainImg}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 35vw"
              priority
            />
          </motion.div>
          <div className="flex gap-3 mt-5">
            {images?.map((img: string, idx: number) => (
              <button
                key={img}
                onClick={() => setMainImg(img)}
                className={`w-16 h-16 rounded-lg border-2 transition-all overflow-hidden ${
                  mainImg === img
                    ? "border-black scale-105 shadow"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                aria-label={`Miniatura ${idx + 1}`}
                type="button"
              >
                <Image
                  src={img}
                  alt={`Miniatura ${idx + 1}`}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Detalhes do produto */}
        <div className="flex-1 flex flex-col justify-between p-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
              {title}
            </h1>
            <span className="text-xl md:text-2xl font-bold text-blue-700 mb-6 block">
              {price}
            </span>
            <p className="text-gray-700 mb-6">{description}</p>

            {/* Campo de disponibilidade de entrega por CEP */}
            <form
              onSubmit={handleCepSubmit}
              className="mb-6 flex flex-col sm:flex-row items-start sm:items-end gap-2"
            >
              <div>
                <label
                  htmlFor="cep"
                  className="block text-sm font-semibold text-black mb-1"
                >
                  Consulte a disponibilidade para seu CEP
                </label>
                <input
                  id="cep"
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="Digite seu CEP"
                  className="border border-black/20 rounded px-3 py-2 focus:outline-none focus:border-black transition w-40"
                  maxLength={9}
                  pattern="\d{5}-?\d{3}"
                  inputMode="numeric"
                />
                <button
                  type="submit"
                  className="bg-black text-white font-bold px-4 py-2 rounded hover:bg-blue-700 transition ml-2"
                  disabled={cepLoading}
                >
                  {cepLoading ? "Consultando..." : "Consultar"}
                </button>
              </div>
            </form>
            {cepError && (
              <div className="text-red-600 text-sm mb-2">{cepError}</div>
            )}
            {cepResult && (
              <div className="text-green-700 text-sm mb-4">
                Entrega disponível para:{" "}
                <span className="font-semibold">
                  {cepResult.logradouro ? `${cepResult.logradouro}, ` : ""}
                  {cepResult.bairro ? `${cepResult.bairro}, ` : ""}
                  {cepResult.localidade} - {cepResult.uf}
                </span>
                <span className="ml-2 font-bold text-green-800">
                  ✔ Disponível
                </span>
              </div>
            )}

            {/* Tamanhos */}
            {variants?.tamanhos && variants.tamanhos.length > 0 && (
              <div className="mb-6">
                <span className="block text-sm font-semibold text-black mb-2">
                  Tamanho
                </span>
                <div className="flex gap-3">
                  {variants.tamanhos.map((size: string) => (
                    <motion.button
                      key={size}
                      whileTap={{ scale: 0.93 }}
                      className={`px-4 py-2 rounded-lg border font-bold transition-all ${
                        selectedSize === size
                          ? "bg-black text-white border-black shadow"
                          : "bg-white text-black border-gray-300 hover:border-black"
                      }`}
                      onClick={() => setSelectedSize(size)}
                      type="button"
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Cores */}
            {variants?.cores && variants.cores.length > 0 && (
              <div className="mb-8">
                <span className="block text-sm font-semibold text-black mb-2">
                  Cor
                </span>
                <div className="flex gap-3">
                  {variants.cores.map((cor: { nome: string; cor: string }) => (
                    <motion.button
                      key={cor.nome}
                      whileTap={{ scale: 0.93 }}
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedColor === cor.nome
                          ? "border-black scale-110"
                          : "border-gray-300 hover:border-black"
                      }`}
                      style={{ background: cor.cor }}
                      onClick={() => setSelectedColor(cor.nome)}
                      aria-label={cor.nome}
                      type="button"
                    >
                      {selectedColor === cor.nome && (
                        <span className="block w-3 h-3 bg-white rounded-full border border-black" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Botões de ação */}
          <div className="flex gap-4 mt-8">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 bg-black text-white font-bold py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              <FaShoppingCart />
              Adicionar ao carrinho
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center bg-white border border-black/10 text-black p-3 rounded-lg shadow hover:bg-black hover:text-white transition"
            >
              <FaHeart />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}