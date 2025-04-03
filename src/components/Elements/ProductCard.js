// @ts-nocheck (esto le dice a TypeScript que no haga chequeos en este archivo)

import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"; // Para navegar entre páginas
import { useCart } from "../../context"; // Hook personalizado para acceder al carrito
import { Rating } from "./Rating"; // Componente que muestra las estrellas de puntuación
import React from "react";

export const ProductCard = ({ product }) => {
    // Desestructuramos funciones y datos del contexto del carrito
    const { cartList, addToCart, removeFromCart } = useCart();

    // Estado local que indica si el producto está o no en el carrito
    const [inCart, setInCart] = useState(false);

    // Desestructuramos los campos del producto recibido por props
    const { id, name, overview, poster, price, rating, best_seller } = product;

    // Este efecto se ejecuta cada vez que cambia el carrito o el ID del producto
    useEffect(() => {
        const productInCart = cartList.find(item => item.id === product.id); // Buscamos si el producto está en el carrito

        if (productInCart) {
            setInCart(true); // Si está, lo marcamos como en el carrito
        } else {
            setInCart(false); // Si no está, lo marcamos como fuera
        }

    }, [cartList, product.id]); // Dependencias del efecto

    return (
        <div className="m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            {/* Imagen y enlace al detalle del producto */}
            <Link to={`/products/${id}`} className="relative" >
                {/* Si es "best seller", mostramos etiqueta */}
                {best_seller && <span className="absolute top-4 left-2 px-2 bg-orange-500 bg-opacity-90 text-white rounded">Best Seller</span>}
                <img className="rounded-t-lg w-full h-64" src={poster} alt={name} />
            </Link>

            {/* Contenido textual y botones */}
            <div className="p-5">
                {/* Nombre del producto con enlace al detalle */}
                <Link to={`/products/${id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                </Link>

                {/* Descripción corta */}
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{overview}</p>

                {/* Puntuación en estrellas */}
                <div className="flex items-center my-2">
                    <Rating rating={rating} />
                </div>

                {/* Precio + Botón de acción */}
                <p className="flex justify-between items-center">
                    <span className="text-2xl dark:text-gray-200">
                        <span>$</span><span>{price}</span>
                    </span>

                    {/* Si el producto NO está en el carrito, mostramos botón para agregar */}
                    {
                        !inCart && (
                            <button
                                onClick={() => addToCart(product)} // Al hacer click, se agrega al carrito
                                className={`inline-flex items-center py-2 px-3 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${product.in_stock ? "" : "cursor-not-allowed"}`}
                                disabled={!product.in_stock} // Si no hay stock, se desactiva el botón
                            >
                                Add To Cart <i className="ml-1 bi bi-plus-lg"></i>
                            </button>
                        )
                    }

                    {/* Si el producto SÍ está en el carrito, mostramos botón para eliminar */}
                    {
                        inCart && (
                            <button
                                onClick={() => removeFromCart(product)} // Al hacer click, se elimina del carrito
                                className={`inline-flex items-center py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-800 ${product.in_stock ? "" : "cursor-not-allowed"}`}
                                disabled={!product.in_stock} // También se desactiva si no hay stock
                            >
                                Remove Item <i className="ml-1 bi bi-trash3"></i>
                            </button>
                        )
                    }
                </p>
            </div>
        </div>
    )
}
