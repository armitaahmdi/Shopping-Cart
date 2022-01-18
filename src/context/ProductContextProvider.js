import React, { createContext, useEffect, useState } from 'react';

//API
import { getProducts } from '../services/api';

export const ProductsContext = createContext()

const ProductContextProvider = (props) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        //چون از فانکشن اسینک استفاده میکنه و اطلاعات میگیره باید به صورت اسینک هم نوشته شود
        const fetchAPI = async () => {
            setProducts(await getProducts());
        };

        fetchAPI();
    }, [])

    return (
        <ProductsContext.Provider value={products}>
            {props.children}
        </ProductsContext.Provider>
    );
};

export default ProductContextProvider;