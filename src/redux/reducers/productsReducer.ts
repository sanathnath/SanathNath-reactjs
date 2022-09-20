import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

export interface Products{
  '_id'?:string;
  name?:string;
  avatar?:string;
  description?:string;
  price?:number;
  category?:string;
  developerEmail?:string;
  createdAt?:string;
  updateAt?:string;
  '__v'?:number;
}

export interface ProductState {
  allProducts: Products[];
  selectedProduct: Products;
  favoriteProducts: Products[];
  allCategory: Products[];
  selectedCategory: Products[];
  isCategoryButtonOpen: boolean;
  isDrawerOpen: boolean;
}

const initialState: ProductState = {
  allProducts: [],
  selectedProduct:{},
  favoriteProducts:[],
  allCategory:[],
  selectedCategory:[],
  isCategoryButtonOpen:false,
  isDrawerOpen: false,
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    get_all_product: (state, action: PayloadAction<Products[]>) => {
      console.log("produ",state.allProducts);
      
      state.allProducts = action.payload
    },
    select_product: (state, action :PayloadAction<Products>) => {
      state.selectedProduct = action.payload
    },
    clean_selected_product: (state) => {
      state.selectedProduct = {}
    },
    get_all_category: (state, action: PayloadAction<Products[]>) => {
      state.allCategory = action.payload
    },
    select_category: (state, action: PayloadAction<Products[]>) => {
      state.selectedCategory = action.payload
    },
    add_new_product: (state, action: PayloadAction<Products>) => {
      state.allProducts.push(action.payload)
    },
    delete_product: (state, action: PayloadAction<string | undefined>) => {
      state.allProducts = state.allProducts.filter((item)=>{
        if (item['_id'] !== action.payload) {
          return item;
        }
      });
      
      if(state.favoriteProducts.length !== 0){
        state.favoriteProducts = state.favoriteProducts.filter((item)=>{
          if (item['_id'] !== action.payload) {
            return item;
          }
        });
      }
    },
    category_button_handler: (state, action: PayloadAction<boolean>) => {
      state.isCategoryButtonOpen = action.payload
    },
    set_drawer_open: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { get_all_product, select_product, clean_selected_product,
               get_all_category, select_category, 
               add_new_product, delete_product, 
               category_button_handler, set_drawer_open } = productSlice.actions

export default productSlice.reducer