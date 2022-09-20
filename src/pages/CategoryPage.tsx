import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { category_button_handler, delete_product, Products } from '../redux/reducers/productsReducer';
import Loading from '../container/Loading';
import ProductCard from '../container/ProductCard';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const CategoryPage: React.FC = () => {
  const [categoryProducts, setCategoryProducts] = useState<Products[]>([])
  const { name } = useParams();
  const dispatch = useAppDispatch();

  const { allProducts } = useAppSelector((state: RootState)=>{
    return state.products;
  })

  const deleteHandler = (data: string | undefined) => {
    dispatch(delete_product(data));
  }
  useEffect(() => {
    dispatch(category_button_handler(false));
    let arr = allProducts.filter((item) => {
      if(item.category === name){
        return item;
      }
    })
    setCategoryProducts(arr);
  }, [name])
  
  return (
    <div className="pt-12 sm:pt-20 md:pt-20 flex flex-col justify-center bg-gray-50">
      <h3 className="font-bold text-3xl p-8 pl-24 tracking-wide">{name}</h3>

        {categoryProducts.length === 0 ? (
          <Loading />
        ) : (
          <div className="md:container px-2 md:px-20 py-8 grid grid-cols-2 gap-9 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {categoryProducts.map((item) => {
            return (
              <ProductCard key={item['_id']} data={item} deleteHandler={deleteHandler} page="category" />
            );
          })
        }
      </div>
        )}
    </div>
  )
}

export default CategoryPage