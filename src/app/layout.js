import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../component/Header";
import FilterAll from "../component/PrincipalFilter";
import ReactQueryProvider from "../providers/reactQueryProvider.js";
import Footer from "@/component/Footer";
import ReactToastContainer from "@/component/ReactToastContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ADAT",
  description: "Site ADAT para análise de dados de acidente de trânsito",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <ReactQueryProvider>
        <body className={`flex flex-col min-h-screen ${inter.className}`}>
          <Header />
          <FilterAll />
          <div className="flex-grow">
            <ReactToastContainer />
            {children}
          </div>
          <Footer />
        </body>
      </ReactQueryProvider>
    </html>
  );
}
