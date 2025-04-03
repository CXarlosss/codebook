import React from "react";

// Componente Rating: recibe una `rating` (número entre 0 y 5) como prop
export const Rating = ({ rating }) => {
    // Creamos un array de 5 elementos que por defecto son `false` (sin estrella rellena)
    let ratingArray = Array(5).fill(false);

    // Rellenamos el array hasta el valor de `rating` con `true` (estrella rellena)
    for (let i = 0; i < rating; i++) {
        ratingArray[i] = true;
    }

    return (
        <>
            {
                // Mapeamos el array para mostrar una estrella llena (si es true) o vacía (si es false)
                ratingArray.map((value, index) => (
                    value ? (
                        // Estrella rellena
                        <i key={index} className="text-lg bi bi-star-fill text-yellow-500 mr-1"></i>
                    ) : (
                        // Estrella vacía
                        <i key={index} className="text-lg bi bi-star text-yellow-500 mr-1"></i>
                    )
                ))
            }
        </>
    );
};
