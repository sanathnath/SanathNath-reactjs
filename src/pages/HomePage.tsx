import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../container/Loading';
import ProductCard from '../container/ProductCard';
import { category_button_handler, delete_product, Products } from '../redux/reducers/productsReducer';
import { add_to_favorite } from '../redux/reducers/favoriteReducer';
import { RootState } from '../redux/store';


const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts } = useSelector((state: RootState)=>{
    return state.products;
  })

  const deleteHandler = (data: string | undefined) => {
    dispatch(delete_product(data))
  }
  useEffect(()=>{
    dispatch(category_button_handler(false))
  },[])

  return (
    <div className="pt-20 flex justify-center bg-gray-50">
        {allProducts.length === 0 ? (
          <Loading />
        ) : (
      <div className="container px-24 py-8 grid grid-cols-4 gap-9">
          {allProducts.map((item) => {
            return (
              <ProductCard key={item['_id']} data={item} deleteHandler={deleteHandler} page="home"/>
              
            );
          })
        }
      </div>)}
    </div>
  )
}

export default HomePage