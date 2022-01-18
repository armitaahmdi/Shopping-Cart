import React, { createContext, useReducer } from 'react';

const initialState = {
    // Mahsolate entekhab shode
    selectedItem: [],
    // Tedade mahsolat
    itemsCounter: 0,
    // Qeymat nahaii
    total: 0,
    // Tasvie hesab
    checkout: false
}

const sumItems = (items) => {
    const itemsCounter = items.reduce((total, product) => total + product.quantity, 0);
    const total = items.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    return{itemsCounter, total}
}

const cartReducer = (state, action) => {
    switch (action.type) {
        // Dafe aval ke mahsoli ADD mishe
        case 'ADD_ITEM':
            // Search kon aya mahsoli ke click shode hast to selectedItem ya na
            if (!state.selectedItem.find(item => item.id === action.payload.id)) {
                state.selectedItem.push({
                    ...action.payload,
                    quantity: 1,
                })
            }
            return {
                ...state,
                selectedItem: [...state.selectedItem],
                ...sumItems(state.selectedItem),
                // Vaghti user CheckOut kard momkene bere va dobare kharid kone baraye hamin:
                checkout: false
            }
        case 'REMOVE_ITEM':
            const newSelectedItems = state.selectedItem.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                selectedItem: [...newSelectedItems],
                ...sumItems(newSelectedItems)
            }
        case 'INCREASE':
            const indexI = state.selectedItem.findIndex(item => item.id === action.payload.id)
            state.selectedItem[indexI].quantity++;
            return {
                ...state,
                ...sumItems(state.selectedItem)
            }
        case 'DECREASE':
            const indexD = state.selectedItem.findIndex(item => item.id === action.payload.id)
            state.selectedItem[indexD].quantity--;
            return {
                ...state,
                ...sumItems(state.selectedItem)
            }
        case 'CHECKOUT':
            return {
                selectedItem: [],
                itemsCounter: 0,
                total: 0,
                checkout: true
            }
        case 'CLEAR':
            return {
                selectedItem: [],
                itemsCounter: 0,
                total: 0,
                checkout: false
            }
        default:
            return state;
    }
}

export const CartContext = createContext()
const CartContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        // Value= state: state, dispatch: dispatch
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;