import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/hooks/store.hooks";
import { addToCart } from "../store/Cart/cart.slice";
import {
  deleteProduct,
  fetchAllProducts,
  getProductsSelector,
  getProductStatus,
  Product,
  removeProduct,
  setProductStatus,
} from "../store/Products/products.slice";

export const ProductsList: React.FC = () => {
  const products = useSelector(getProductsSelector);
  const productStatus = useSelector(getProductStatus);
  const dispatch:any = useAppDispatch();
  
  
  console.log(productStatus)
  useEffect(() => {
    
    if (productStatus === 'idle') {
     dispatch(fetchAllProducts())
    }
     
    }, [products, productStatus, dispatch])



  const addToCartHandler = (product: Product) => {
    dispatch(addToCart(product))
  }


  const deleteFromStore = (id: number) => {
    dispatch(removeProduct(id));
    dispatch(deleteProduct(id));
    
  }

  return (
    <div className="product-list">
      {products.map((product: Product) => (
        <div className="product-item" key={product.id}>
          <span className="product-item-label">{`${product.title} : ${product.price}`}</span>
          <button
            onClick={() => {
              if(product.internalId !== undefined){
                deleteFromStore(product.internalId)
              }
              
             
            }}
            className="product-item-button-delete"
          >
            Delete
          </button>
         
          <button
            onClick={() => addToCartHandler(product)}
            className="product-item-button-delete"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};
