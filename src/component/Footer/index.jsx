import Button from '@mui/material/Button';
import * as React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb';

export default function Footer() {
    return (
        <div className="bg-gray-700 text-white flex items-center flex-col gap-5 mt-5 py-20">
            <h1 className="text-3xl font-semibold">Adat.com</h1>
            
            <ul className="flex justify-center flex-row gap-5">
                <li><a href="https://duarte25.github.io/portfolio/" target="_blank" rel="noopener noreferrer">PORTFÓLIO</a></li>
                <li><a href="duarte.guga2025@gmail.com" target="_blank" rel="noopener noreferrer">CONTATO</a></li>
                <li><a href="https://ifro.edu.br" target="_blank" rel="noopener noreferrer">IFRO</a></li>
            </ul>

            <div className="flex flex-row gap-5 font-medium">
                <a href="https://www.linkedin.com/in/gustavo-duarte-46a229169/" target="_blank" rel="noopener noreferrer">
                    <TbBrandLinkedin className="h-10 w-10 hover:text-blue-400 transition-colors duration-300" />
                </a>
                <a href="https://github.com/duarte25" target="_blank" rel="noopener noreferrer">
                    <TbBrandGithub className="h-10 w-10 hover:text-gray-400 transition-colors duration-300" />
                </a>
                <a href="https://www.facebook.com/seu-perfil" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="h-10 w-10 hover:text-blue-600 transition-colors duration-300" />
                </a>
            </div>
        </div>
    );
}
