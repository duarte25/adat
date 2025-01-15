"use client";

import { FaCloudSunRain, FaCarCrash, FaFilter } from "react-icons/fa";
import { AiFillAlert } from "react-icons/ai";
import { useEffect, useState } from "react";
import { VscGraph } from "react-icons/vsc";
import { GiBrazil } from "react-icons/gi";
import { TbRoad } from "react-icons/tb";
import clsx from "clsx"; 

export default function FilterAll() {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    // Obtém o caminho atual da página
    setCurrentPage(window.location.pathname);
  }, []);

  const menuItems = [
    { href: "/", icon: <GiBrazil className="h-10 w-10" />, label: ["Estados", "Municipios"] },
    { href: "/climas", icon: <FaCloudSunRain className="h-10 w-10" />, label: ["Tempo / Clima"] },
    { href: "/tipos_veiculos", icon: <FaCarCrash className="h-10 w-10" />, label: ["Tipos de", "Veiculos"] },
    { href: "/pistas", icon: <TbRoad className="h-10 w-10" />, label: ["Pista"] },
    { href: "/estatistias", icon: <VscGraph className="h-10 w-10" />, label: ["Estatística", "Anual"] },
    { href: "/causas", icon: <AiFillAlert className="h-10 w-10 text-beige bg-black" />, label: ["Causa"] },
    { href: "/filtros", icon: <FaFilter className="h-10 w-10" />, label: ["Filtro"] },
  ];

  return (
    <div className="w-full bg-beige flex flex-row  justify-center items-center gap-[10vh]">
      {menuItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className={clsx(
            "flex flex-col items-center",
            currentPage === item.href &&
              "bg-ghost-white border-b-[0.3vw] border-yale-blue h-[6vw]"
          )}
        >
          {item.icon}
          {item.label.map((text, idx) => (
            <h3 key={idx}>{text}</h3>
          ))}
        </a>
      ))}
    </div>
  );
}
