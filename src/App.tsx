import axios from 'axios';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { get_all_product_api, api_token } from './constants/api';
import Header from './container/Header';
import CategoryPage from './pages/CategoryPage';
import CreateProductPage from './pages/CreateProductPage';
import FavoriteProductPage from './pages/FavoriteProductPage';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import { useAppDispatch } from './redux/hooks';
import { get_all_product } from './redux/reducers/productsReducer';
import './App.css';
import Drawer from './container/Drawer';


const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.get(get_all_product_api,
      {headers:{
        Authorization:`Bearer ${api_token}`,
      }}).then((res)=>{
        console.log(res.data);
        dispatch(get_all_product(res.data.products))
      })
  }, [])
  
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/product/:id' element={<ProductDetailPage />}/>
        <Route path='/watch-list' element={<FavoriteProductPage />}/>
        <Route path='/add-product' element={<CreateProductPage />}/>
        <Route path='/category/:name' element={<CategoryPage />}/>
      </Routes>
      <Drawer />
    </div>
  );
}

export default App;
