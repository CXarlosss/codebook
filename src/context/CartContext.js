// @ts-nocheck
import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducers"; // Importamos la función reductora

// Estado inicial del carrito
const cartInitialState = {
    cartList: [], // Lista de productos en el carrito
    total: 0      // Precio total del carrito
}

// Creamos el contexto
const CartContext = createContext(cartInitialState);

// Componente proveedor del carrito (engloba toda la app o una parte)
export const CartProvider = ({children}) => {
    // useReducer nos da el estado actual y la función dispatch
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);

    // Añade un producto al carrito
    function addToCart(product){
        const updatedList = state.cartList.concat(product); // Se añade el nuevo producto
        const updatedTotal = state.total + product.price;   // Se actualiza el total

        dispatch({
            type: "ADD_TO_CART", // Tipo de acción que reconoce el reducer
            payload: {
                products: updatedList,
                total: updatedTotal
            }
        });
    }

    // Elimina un producto del carrito
    function removeFromCart(product){
        const updatedList = state.cartList.filter(item => item.id !== product.id); // Filtra el producto a eliminar
        const updatedTotal = state.total - product.price;

        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                products: updatedList,
                total: updatedTotal
            }
        });
    }

    // Vacía el carrito por completo
    function clearCart(){
        dispatch({
            type: "CLEAR_CART",
            payload: {
                products: [],
                total: 0
            }
        });
    }

    // Creamos el valor que compartiremos con los componentes hijos
    const value = {
        cartList: state.cartList,
        total: state.total,
        addToCart,
        removeFromCart,
        clearCart
    };

    // Retornamos el proveedor del contexto con ese valor
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

// Hook personalizado para usar fácilmente el contexto desde cualquier componente
export const useCart = () => {
    const context = useContext(CartContext);
    return context;
}
