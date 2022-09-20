import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api_token, select_product_api } from '../constants/api';
import Loading from '../container/Loading';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { add_to_favorite } from '../redux/reducers/favoriteReducer';
import { clean_selected_product, select_product } from '../redux/reducers/productsReducer';
import { RootState } from '../redux/store';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{id?: string}>();

  const { selectedProduct } = useAppSelector((state: RootState) => {
    return state.products;
  })

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    axios.get(select_product_api(id),
      {headers:{
        Authorization:`Bearer ${api_token}`,
      }}).then((res)=>{
            dispatch(select_product(res.data.product))
            console.log(res.data);
      })
  
    return () => {
      dispatch(clean_selected_product());
    }
  }, [])
  
  return (
    <div className="pt-20">
      {Object.keys(selectedProduct).length === 0 ?
      <Loading /> :
        <div className="container px-5 lg:px-24 pb-20">
        <div className="flex flex-col justify-center md:flex-row w-full">
          <div className="w-full md:w-1/2">
            <img
              src={selectedProduct.avatar}
              alt=""
              className="w-full"
            />
          </div>
          <div className="w-1/2 flex flex-col py-24 px-12 border-y border-r align-start">
            <div className="text-left">
              <h2 className="font-semibold text-3xl">
                {selectedProduct.name}
              </h2>
            </div>
            <div className="border-l-8 mt-8 pl-2 border-green-500">
              <h4 className="tracking-wide font-extrabold text-2xl">
                <span className="font-normal">₹ </span>{selectedProduct.price}/-</h4>
            </div>
            <span className="inline-block mt-14 text-gray-500">{selectedProduct.category}</span>
            <span className="inline-block mt-5">
              {selectedProduct.description}
            </span>
            <span className="inline-block mt-14">
              Contact: {selectedProduct.developerEmail}
            </span>
            <div className="mt-auto text-center">
              <button className="text-red-500 px-5 py-1 border border-red-500 rounded-md hover:bg-red-400"
              onClick={()=>{
                dispatch(add_to_favorite(selectedProduct));
              }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 float-right"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <span className="float-right pr-2">
                  Add to favorite
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default ProductDetailPage