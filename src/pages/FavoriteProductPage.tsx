import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FavoriteEmpty from "../container/FavoriteEmpty";
import ProductCard from "../container/ProductCard";
import { remove_from_favorite } from "../redux/reducers/favoriteReducer";
import { RootState } from "../redux/store";

const FavoriteProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favoriteProducts } = useSelector((state: RootState) => {
    return state.favorites;
  });
  const removeHandler = (data: string | undefined) => {
    dispatch(remove_from_favorite(data));
  };
  return (
    <div className="pt-18 flex justify-center bg-gray-50">
      {favoriteProducts.length === 0 ? (
        <FavoriteEmpty />
      ) : (
        <div className="container px-24 py-24 grid grid-cols-4 gap-9">
          {favoriteProducts.map((item) => {
            return (
              <ProductCard
                key={item["_id"]}
                data={item}
                deleteHandler={removeHandler}
                page="favorite"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FavoriteProductPage;
