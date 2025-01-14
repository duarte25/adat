import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../component/Header";
import FilterAll from "../component/PrincipalFilter";
import ReactQueryProvider from "../providers/reactQueryProvider.js"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ADAT",
  description: "Site ADAT para análise de dados de acidente de trânsito",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <ReactQueryProvider>
        <body className={inter.className}>
          <Header/>
          <FilterAll />
          {children}
        </body>
      </ReactQueryProvider>
    </html>
  );
}
