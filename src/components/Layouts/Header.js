// @ts-nocheck: ignora errores de TypeScript si estás en proyecto JS

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png"; // Logo de la app
import { Search } from "../Sections/Search"; // Componente de búsqueda
import { DropdownLoggedOut, DropdownLoggedIn } from "../index"; // Dropdowns según login
import { useCart } from "../../context"; // Hook personalizado para el carrito
import React from "react";

export const Header = () => {
  // Extraemos el carrito desde el contexto
  const { cartList } = useCart();

  // Manejamos si está activado el modo oscuro
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);

  // Controla si se muestra la barra de búsqueda
  const [searchSection, setSearchSection] = useState(false);

  // Controla si se muestra el dropdown del usuario
  const [dropdown, setDropdown] = useState(false);

  // Obtenemos el token de sesión para saber si el usuario está logueado
  const token = JSON.parse(sessionStorage.getItem("token"));

  useEffect(() => {
    // Guardamos el estado del modo oscuro en el localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    // Activamos o desactivamos la clase `dark` en el HTML (para TailwindCSS dark mode)
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]); // Solo se ejecuta si cambia darkMode

  return (
    <header>      
      <nav className="bg-white dark:bg-gray-900">
        <div className="border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-3">
          
          {/* Logo y nombre de la marca */}
          <Link to="/" className="flex items-center">
            <img src={Logo} className="mr-3 h-10" alt="CodeBook Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              CodeBook
            </span>
          </Link>

          {/* Iconos a la derecha (modo oscuro, búsqueda, carrito, usuario) */}
          <div className="flex items-center relative">
            
            {/* Botón para activar/desactivar dark mode */}
            <span 
              onClick={() => setDarkMode(!darkMode)} 
              className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear-wide-connected">
            </span>

            {/* Botón para mostrar/ocultar la barra de búsqueda */}
            <span 
              onClick={() => setSearchSection(!searchSection)} 
              className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-search">
            </span>

            {/* Icono del carrito con número de productos */}
            <Link to="/cart" className="text-gray-700 dark:text-white mr-5">
              <span className="text-2xl bi bi-cart-fill relative">
                <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full ">
                  {cartList.length}
                </span>
              </span>                    
            </Link>

            {/* Icono del usuario y dropdown según login */}
            <span 
              onClick={() => setDropdown(!dropdown)} 
              className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white">
            </span>

            {/* Mostramos el menú correspondiente según si hay token */}
            { dropdown && (
              token 
              ? <DropdownLoggedIn setDropdown={setDropdown} /> 
              : <DropdownLoggedOut setDropdown={setDropdown} />
            )}
          </div>
        </div>
      </nav>

      {/* Si el usuario activa la búsqueda, mostramos el componente */}
      { searchSection && <Search setSearchSection={setSearchSection} /> }
    </header>
  );
}
