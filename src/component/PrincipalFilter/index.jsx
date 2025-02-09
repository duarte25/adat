"use client";

import { FaCloudSunRain, FaCarCrash, FaFilter } from "react-icons/fa";
import { AiFillAlert } from "react-icons/ai";
import { useEffect, useState } from "react";
import { VscGraph } from "react-icons/vsc";
import { GiBrazil } from "react-icons/gi";
import { TbRoad } from "react-icons/tb";
import clsx from "clsx";
import { MdCalendarMonth } from "react-icons/md";

export default function FilterAll() {
  const [currentPage, setCurrentPage] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);

  // Use useEffect para adicionar a classe ativo com base na URL atual
  useEffect(() => {
    const currentPage = window.location.pathname;

    // Seleciona todos os links dentro do container
    const menuItems = document.querySelectorAll('.linksWrapper a');

    menuItems.forEach(item => {
      // Verifica se o link corresponde à página atual
      if (item.getAttribute("href") === currentPage) {
        // Adiciona a classe "active" (no caso, estilo de Tailwind)
        item.classList.add('border-b-4', 'border-sandy-brown', 'rounded-bl-[8vh]');
      } else {
        // Remove a classe se não for a página atual
        item.classList.remove('border-b-4', 'border-sandy-brown', 'rounded-bl-[8vh]');
      }
    });
  }, []);

  useEffect(() => {
    // Obtém o caminho atual da página
    setCurrentPage(window.location.pathname);
  }, []);

  const menuItems = [
    { href: "/", icon: <GiBrazil className="h-10 w-10" />, label: ["Estados", "Municipios"] },
    { href: "/climas", icon: <FaCloudSunRain className="h-10 w-10" />, label: ["Tempo / Clima"] },
    { href: "/pistas", icon: <TbRoad className="h-10 w-10" />, label: ["Pista"] },
    { href: "/estatistica_anual", icon: <VscGraph className="h-9 w-9 mt-1" />, label: ["Estatística", "Anual"] },
    { href: "/calendario", icon: <MdCalendarMonth className="h-10 w-10" />, label: ["Calendario", "Veiculos"] },
    // { href: "/causas", icon: <AiFillAlert className="h-10 w-10 text-beige bg-black" />, label: ["Causa"] },
    // { href: "/filtros", icon: <FaFilter className="h-10 w-10" />, label: ["Filtro"] },
  ];

  const menuBurguer = [
    { href: "/", label: ["Estados", "Municipios"] },
    { href: "/climas", label: ["Tempo / Clima"] },
    { href: "/pistas", label: ["Pista"] },
    { href: "/estatistica_anual", label: ["Estatística", "Anual"] },
    { href: "/calendario", label: ["Calendario", "Veiculos"] },
    // { href: "/causas", label: ["Causa"] },
    // { href: "/filtros", label: ["Filtro"] },
  ];

  return (
    <div className="w-full bg-beige flex flex-row justify-center items-center">
      {/* Menu Principal */}
      <div className={`hidden md:flex flex-row gap-10`}>
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={clsx(
              "flex flex-col items-center justify-center",
              currentPage === item.href &&
              "bg-ghost-white border-b-[0.3vw] border-yale-blue"
            )}
          >
            {item.icon}
            {item.label.map((text, idx) => (
              <h3 key={idx}>{text}</h3>
            ))}
          </a>
        ))}
      </div>

      {/* Botão Menu Burger */}
      <button
        onClick={() => setToggleMenu(!toggleMenu)}
        className="md:hidden flex items-center absolute right-5 top-5"
        // className="md:hidden absolute right-5 "
      >
        <span className="text-3xl text-snow-white">&#9776;</span> {/* Ícone do menu burger */}
      </button>

      {/* Menu Burger */}
      {toggleMenu && (
        <div className="fixed top-0 right-0 bg-ghost-white h-full w-3/4 shadow-lg p-5 z-10">
          <button
            onClick={() => setToggleMenu(false)}
            className="absolute top-5 right-5 text-xl"
          >
            &#x2715; {/* Ícone de fechar */}
          </button>
          <ul className="flex flex-col gap-5">
            {menuBurguer.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="text-lg">
                  {item.label.join(" ")}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
