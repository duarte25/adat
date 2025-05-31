import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginNext from "@next/eslint-plugin-next";
import babelParser from "@babel/eslint-parser"; // Se você precisar do parser Babel

export default [
  {
    // Configurações globais e para arquivos JS/JSX
    files: ["**/*.{js,jsx,mjs,cjs}"], // Aplica-se a esses tipos de arquivos
    languageOptions: {
      parser: babelParser, // Usando o parser Babel
      parserOptions: {
        requireConfigFile: false, // Desativa a exigência de um arquivo babel.config.js
        babelOptions: {
          presets: ["@babel/preset-react"], // Adicione presets Babel que você usa
          // outras opções Babel se necessário
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser, // Variáveis globais de navegador (window, document, etc.)
        // Adicione outras variáveis globais se precisar (ex: process, module)
      },
    },
    plugins: {
      react: pluginReact, // Registra o plugin React
      "@next/next": pluginNext, // Registra o plugin Next.js
    },
    rules: {
      // Regras do ESLint recomendadas
      ...pluginJs.configs.recommended.rules,
      // Regras do React recomendadas
      ...pluginReact.configs.recommended.rules,
      // Regras do React JSX Runtime (importante para React 17+)
      ...pluginReact.configs["jsx-runtime"].rules,
      // Regras do Next.js (equivalente a 'next/core-web-vitals')
      ...pluginNext.configs["core-web-vitals"].rules,

      // Suas regras personalizadas aqui:
      "react/prop-types": "off", // Exemplo: desativar prop-types se não usar
      // "react/react-in-jsx-scope": "off", // Se você estiver em React 17+ e usando o novo JSX transform
      // outras regras...
    },
    settings: {
      react: {
        version: "detect", // Detecta automaticamente a versão do React
      },
    },
  },
  {
    // Se você tiver arquivos TypeScript (apenas um exemplo, você não tem "@types/typescript"
    // nas suas devDependencies, mas o Next.js pode inferir)
    // files: ["**/*.{ts,tsx}"],
    // languageOptions: {
    //   parser: "@typescript-eslint/parser",
    //   parserOptions: {
    //     project: "./tsconfig.json", // Opcional, se você tiver um tsconfig.json
    //   },
    // },
    // plugins: {
    //   "@typescript-eslint": pluginTs,
    // },
    // extends: [
    //   pluginTs.configs.recommended,
    //   pluginTs.configs.stylistic,
    // ],
    // rules: {
    //   // Regras específicas do TypeScript
    // },
  },
  {
    // Regras para ignorar arquivos/pastas (substitui .eslintignore)
    // Certifique-se de que isso corresponda ao seu .gitignore ou o que você deseja ignorar
    ignores: [
      "node_modules/",
      ".next/",
      "dist/",
      "build/",
      "public/",
      "coverage/",
      // Adicione quaisquer outras pastas ou arquivos que você queira ignorar
    ],
  },
];