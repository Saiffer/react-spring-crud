import React, { useState } from "react";
import { useAppDispatch } from "../store/hooks/store.hooks";
import { addNewProduct, addProduct, Product, setProductStatus } from "../store/Products/products.slice";
import "./ProductForm.scss";

export const ProductForm: React.FC = () => {

  const dispatch = useAppDispatch()



  const [product, setProduct] = useState<Product>({
    id: "",
    title: "",
    price: 0,
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setProduct((prev) => {
      (prev as any)[name] = value;
      const newValue = { ...prev };
      return newValue;
    });

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      dispatch(addProduct(product));
      dispatch(addNewProduct(product))
      setProduct({id: "", title: "", price: 0});
      console.log(product);
    }

  return (
    <>
      <h2>Add Game to The Store</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="product-container">
          <label
            className="product-label"
            htmlFor="title"
            placeholder="Game Title"
          >
            Title:{" "}
          </label>
          <input
            className="product-input"
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
          />
        </div>

        <div className="product-container">
          <label
            className="product-label"
            htmlFor="price"
            placeholder="Game Price"
          >
            Price:{" "}
          </label>
          <input
            className="product-input"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>

        <div className="product-container">
          <label className="product-label" htmlFor="id" placeholder="Game ID">
            ID:{" "}
          </label>
          <input
            className="product-input"
            type="text"
            name="id"
            value={product.id}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="product-button-submit">
          Add price
        </button>
      </form>
    </>
  );
};
