import Styles from "./styles.module.css";

export default function Cabecalho() {

    return (
        <div className={Styles.container}>
            <div className={Styles.logo}>
                <div className={Styles.upside}>
                    <h1 className={Styles.h1}>ADAT</h1>
                    <h3 className={Styles.h3}>ACIDENTES NO </h3>
                </div>
                <h2 className={Styles.h2}>TRANSPORTE BRASILEIRO</h2>
            </div>
        </div>
    )
}