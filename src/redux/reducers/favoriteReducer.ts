import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Products } from './productsReducer'

export interface FavoriteState {
  favoriteProducts: Products[];
}

const initialState: FavoriteState = {
  favoriteProducts:[],
}

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add_to_favorite: (state, action: PayloadAction<Products>) => {
       state.favoriteProducts.push(action.payload)
    },
    remove_from_favorite: (state, action: PayloadAction<string | undefined>) => {
      state.favoriteProducts = state.favoriteProducts.filter((item)=>{
        if (item['_id'] !== action.payload) {
          return item;
        }
      });
    },
  },
})

// Action creators are generated for each case reducer function
export const { add_to_favorite, remove_from_favorite, } = favoriteSlice.actions

export default favoriteSlice.reducer