"use client"
import Styles from "./styles.module.css";
import { GiBrazil } from "react-icons/gi";
import { FaCloudSunRain, FaCarCrash, FaFilter } from "react-icons/fa";
import { TbRoad } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";
import { AiFillAlert } from "react-icons/ai";
import { useEffect } from "react";

export default function FilterAll() {

    useEffect(() => {
        const currentPage = window.location.pathname;
        const menuItems = document.querySelectorAll(`.${Styles.container} a`);
        menuItems.forEach(item => {
            if (item.getAttribute("href") === currentPage) {
                item.classList.add(Styles.active);
            }
        });
    }, []);

    return (
        <div className={Styles.container}>
            <a href="/" className={`${Styles.stade} ${Styles.allFilter}`}>
                <GiBrazil className={Styles.icon} />
                <h3>Estados</h3>
                <h3>Municipios</h3>
            </a>
            <a href="/climas" className={`${Styles.weather} ${Styles.allFilter}`}>
                <FaCloudSunRain className={Styles.icon} />
                <h3>Tempo / Clima</h3>
            </a>
            <a href="/tipos_veiculos" className={`${Styles.vehicles} ${Styles.allFilter}`}>
                <FaCarCrash className={Styles.icon} />
                <h3>Tipos de</h3>
                <h3>Veiculos</h3>
            </a>
            <a href="/pistas" className={`${Styles.track} ${Styles.allFilter}`} >
                <TbRoad className={Styles.icon} />
                <h3>Pista</h3>
            </a>
            <a href="/estatistias" className={`${Styles.statistic} ${Styles.allFilter}`} >
                <VscGraph className={Styles.icon} />
                <h3>Estatística</h3>
                <h3>Anual</h3>
            </a>
            <a href="/causas" className={`${Styles.cause} ${Styles.allFilter}`} >
                <AiFillAlert style={{ color: "var(--beige)", background: "black" }} className={Styles.icon} />
                <h3>Causa</h3>
            </a>
            <a href="/filtros" className={`${Styles.filter} ${Styles.allFilter}`} >
                <FaFilter className={Styles.icon} />
                <h3>Filtro</h3>
            </a>
        </div>
    )
}