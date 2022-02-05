import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useAppDispatch } from "../hooks/store.hooks";
import { RootState } from "../store";

export interface Product {
  title: string;
  price: number;
  id: string;
  internalId?: number | undefined;
}

interface productsApi {
  products: Product[];
  status?: string | undefined;
  error?: string | undefined | null;
}

const initialProducts: productsApi = {
  products: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialProducts,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => ({
      ...state,
      products: state.products.filter(
        (product) => product.internalId !== action.payload
      ),
    }),
    setProductStatus: (state, action: PayloadAction<string>) => ({
        ...state,
        status: action.payload
    }),
        
    
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.status = "succeeded";
          // Add any fetched posts to the array
          state.products = state.products.concat(action.payload);
        }
      )
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addProduct, removeProduct, setProductStatus } = productsSlice.actions;

export const getProductsSelector = (state: RootState) =>
  state.products.products;
export const getProductStatus = (state: RootState) => state.products.status;
export const getProductError = (state: RootState) => state.products.error;
export default productsSlice.reducer;

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = axios
      .get("http://localhost:8080/store/products")
      .then((res) => res.data);
    return response;
  }
);

export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (product: Product) => {
    const response = await axios
      .post(
        "http://localhost:8080/store/products/add",
        JSON.stringify(product),
        {
          headers: { "content-type": "application/json" },
        }
      )
      .then((res) => res.data);

    return response;
  }
);

export const deleteProduct = createAsyncThunk("products/deleteProduct", async(internalId: number | undefined)=>{
    
    axios.delete(`http://localhost:8080/store/products/${internalId}`, {params: {internalId: internalId}});
            
})
