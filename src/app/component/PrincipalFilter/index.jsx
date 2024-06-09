import Styles from "./styles.module.css";
import { GiBrazil } from "react-icons/gi";
import { FaCloudSunRain, FaCarCrash, FaFilter } from "react-icons/fa";
import { TbRoad } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";
import { AiFillAlert } from "react-icons/ai";

export default function Cabecalho() {

    return (
        <div className={Styles.container}>
            <div className={`${Styles.stade} ${Styles.allFilter}`}>
                <GiBrazil className={Styles.icon} />
                <a>Estados</a>
                <a>Municipios</a>
            </div>
            <div className={`${Styles.weather} ${Styles.allFilter}`}>
                <FaCloudSunRain className={Styles.icon} />
                <a>Tempo / Clima</a>
            </div>
            <div className={`${Styles.vehicles} ${Styles.allFilter}`}>
                <FaCarCrash className={Styles.icon} />
                <a>Tipos de</a>
                <a>Veiculos</a>
            </div>
            <div className={`${Styles.track} ${Styles.allFilter}`} >
                <TbRoad className={Styles.icon} />
                <a>Pista</a>
            </div>
            <div className={`${Styles.statistic} ${Styles.allFilter}`} >
                <VscGraph className={Styles.icon} />
                <a>Estatística</a>
                <a>Anual</a>
            </div>
            <div className={`${Styles.cause} ${Styles.allFilter}`} >
                <AiFillAlert style={{color: "var(--beige)", background: "black"}} className={Styles.icon} />
                <a>Causa</a>
            </div>
            <div className={`${Styles.filter} ${Styles.allFilter}`} >
                <FaFilter className={Styles.icon} />
                <a>Filtro</a>
            </div>
        </div>
    )
}