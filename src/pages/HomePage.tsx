import React, { useEffect } from 'react'
import Loading from '../container/Loading';
import ProductCard from '../container/ProductCard';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { category_button_handler, delete_product, Products } from '../redux/reducers/productsReducer';
import { RootState } from '../redux/store';


const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { allProducts } = useAppSelector((state: RootState)=>{
    return state.products;
  })

  const deleteHandler = (data: string | undefined) => {
    dispatch(delete_product(data))
  }
  useEffect(()=>{
    dispatch(category_button_handler(false))
  },[])

  return (
    <div className="pt-12 sm:pt-20 md:pt-20 flex justify-center bg-gray-50">
        {allProducts.length === 0 ? (
          <Loading />
        ) : (
      <div className="md:container px-2 md:px-20 py-8 grid grid-cols-2 gap-9 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
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