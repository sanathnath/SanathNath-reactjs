import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { category_button_handler, delete_product, Products } from '../redux/reducers/productsReducer';
import { add_to_favorite } from '../redux/reducers/favoriteReducer';
import Loading from '../container/Loading';
import ProductCard from '../container/ProductCard';

const CategoryPage: React.FC = () => {
  const [categoryProducts, setCategoryProducts] = useState<Products[]>([])
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts } = useSelector((state: RootState)=>{
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
    <div className="pt-20 flex flex-col justify-center bg-gray-50">
      <h3 className="font-bold text-3xl p-8 pl-24 tracking-wide">{name}</h3>

        {categoryProducts.length === 0 ? (
          <Loading />
        ) : (
          <div className="container px-24 py-8 grid grid-cols-4 gap-9">
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