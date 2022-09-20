import React from "react";
import FavoriteEmpty from "../container/FavoriteEmpty";
import ProductCard from "../container/ProductCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { remove_from_favorite } from "../redux/reducers/favoriteReducer";
import { RootState } from "../redux/store";

const FavoriteProductPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { favoriteProducts } = useAppSelector((state: RootState) => {
    return state.favorites;
  });

  const removeHandler = (data: string | undefined) => {
    dispatch(remove_from_favorite(data));
  };

  return (
    <div className="pt-12 sm:pt-20 md:pt-20 flex justify-center bg-gray-50">
      {favoriteProducts.length === 0 ? (
        <FavoriteEmpty />
      ) : (
        <div className="md:container px-2 md:px-20 py-8 grid grid-cols-2 gap-9 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
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
