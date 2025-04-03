import { createContext, useContext, useReducer } from "react"
import { filterReducer } from "../reducers"; // Importamos el reducer que manejará las acciones

// Estado inicial del filtro
const filterInitialState = {
    productList: [],         // Lista completa de productos (sin filtros)
    onlyInStock: false,      // Filtro para mostrar solo productos en stock
    bestSellerOnly: false,   // Filtro para mostrar solo los best sellers
    sortBy: null,            // Criterio de ordenación: "lowtohigh" o "hightolow"
    ratings: null            // Filtro por puntuación (estrellas)
}
// Creamos el contexto de filtros
const FilterContext = createContext(filterInitialState);

// Proveedor del contexto (envuelve los componentes que quieren acceder al estado de filtros)
export const FilterProvider = ({children}) => {
    const [state, dispatch] = useReducer(filterReducer, filterInitialState); // Hook useReducer

    // Carga inicial de productos (cuando se obtienen desde la API por ejemplo)
    function initialProductList(products){
        dispatch({
            type: "PRODUCT_LIST",
            payload: {
                products: products
            }
        });
    }

    // Filtra solo best sellers si está activo el filtro correspondiente
    function bestSeller(products){
        return state.bestSellerOnly 
            ? products.filter(product => product.best_seller === true) 
            : products;
    }

    // Filtra solo productos en stock si está activo ese filtro
    function inStock(products){
        return state.onlyInStock 
            ? products.filter(product => product.in_stock === true) 
            : products;
    }

    // Ordena los productos por precio si hay un criterio seleccionado
    function sort(products){
        if(state.sortBy === "lowtohigh"){
            return products.sort((a, b) => Number(a.price) - Number(b.price));
        }
        if(state.sortBy === "hightolow"){
            return products.sort((a, b) => Number(b.price) - Number(a.price));
        }
        return products;
    }

    // Filtra productos según el número de estrellas (valoraciones)
    function rating(products){
        if(state.ratings === "4STARSABOVE"){
            return products.filter(product => product.rating >= 4);
        }
        if(state.ratings === "3STARSABOVE"){
            return products.filter(product => product.rating >= 3);
        }
        if(state.ratings === "2STARSABOVE"){
            return products.filter(product => product.rating >= 2);
        }
        if(state.ratings === "1STARSABOVE"){
            return products.filter(product => product.rating >= 1);
        }
        return products;
    }

    // Aplicamos todos los filtros encadenados sobre la lista original
    const filteredProductList = rating(
        sort(
            inStock(
                bestSeller(state.productList)
            )
        )
    );

    // Creamos el objeto de valor a compartir con los componentes hijos
    const value = {
        state,                    // Estado actual
        dispatch,                 // Función para modificar el estado
        products: filteredProductList, // Lista de productos ya filtrada
        initialProductList        // Función para cargar productos
    }

    // Retornamos el proveedor con los valores definidos
    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

// Hook personalizado para acceder al contexto desde cualquier componente
export const useFilter = () => {
    const context = useContext(FilterContext);
    return context;
}
