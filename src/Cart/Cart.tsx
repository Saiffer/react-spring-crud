import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/store.hooks";
import {
    CartProduct,
    deleteCart,
  getCartSelector,
  getTotalSelector,
  removeFromCart,
} from "../store/Cart/cart.slice";
import { Product } from "../store/Products/products.slice";

export const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(getCartSelector);
  const totalPrice = useAppSelector(getTotalSelector);

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  }

  const deleteCartHandler = () => {
      dispatch(deleteCart());
  }


  return (
    <>
      <h2>Cart</h2>
      <h5>{totalPrice}</h5>
      {cartProducts.map((product: CartProduct) => (
        <div key={product.id}>
            <span>{product.title}</span>
            <span>{product.amount}</span>
            <button onClick={()=>removeFromCartHandler(product.id)}>Remove</button>
            
        </div>
      ))}
      <button onClick={()=>deleteCartHandler()}>Delete Cart</button>
    </>
  );
};
