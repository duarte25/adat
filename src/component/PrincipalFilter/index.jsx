"use client";

import { FaCloudSunRain, FaFilter } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";
import { usePathname } from 'next/navigation';
import { VscGraph } from "react-icons/vsc";
import { GiBrazil } from "react-icons/gi";
import { TbRoad } from "react-icons/tb";
import { useState } from "react";
import Link from 'next/link';
import clsx from "clsx";

export default function FilterAll() {
  const pathname = usePathname();
  const [toggleMenu, setToggleMenu] = useState(false);

  const menuItems = [
    { href: "/", icon: <GiBrazil className="h-10 w-10" />, label: ["Estados"] },
    { href: "/climas", icon: <FaCloudSunRain className="h-10 w-10" />, label: ["Tempo / Clima"] },
    { href: "/pistas", icon: <TbRoad className="h-10 w-10" />, label: ["Pista"] },
    { href: "/estatistica_anual", icon: <VscGraph className="h-9 w-9 mt-1" />, label: ["Estatística", "Anual"] },
    { href: "/calendario", icon: <MdCalendarMonth className="h-10 w-10" />, label: ["Calendário"] },
  ];

  const menuBurguer = [
    { href: "/", label: ["Estados"] },
    { href: "/climas", label: ["Tempo / Clima"] },
    { href: "/pistas", label: ["Pista"] },
    { href: "/estatistica_anual", label: ["Estatística", "Anual"] },
    { href: "/calendario", label: ["Calendário"] },
  ];

  return (
    <div className="w-full bg-beige flex flex-row justify-center items-center">
      {/* Menu Principal */}
      <div className={`hidden md:flex flex-row gap-10`}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={clsx(
              "flex flex-col items-center justify-center",
              pathname === item.href &&
              "bg-ghost-white border-b-[0.3vw] border-yale-blue"
            )}
          >
            {item.icon}
            {item.label.map((text, idx) => (
              <h3 key={idx}>{text}</h3>
            ))}
          </Link>
        ))}
      </div>

      {/* Botão Menu Burger */}
      <button
        onClick={() => setToggleMenu(!toggleMenu)}
        className="md:hidden flex items-center absolute right-5 top-5"
      >
        <span className="text-3xl text-snow-white">&#9776;</span>
      </button>

      {/* Menu Burger */}
      {toggleMenu && (
        <div className="fixed top-0 right-0 bg-ghost-white h-full w-3/4 shadow-lg p-5 z-10">
          <button
            onClick={() => setToggleMenu(false)}
            className="absolute top-5 right-5 text-xl"
          >
            &#x2715;
          </button>
          <ul className="flex flex-col gap-5">
            {menuBurguer.map((item, index) => (
              <li key={index}>
                <Link href={item.href} className="text-lg">
                  {item.label.join(" ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
