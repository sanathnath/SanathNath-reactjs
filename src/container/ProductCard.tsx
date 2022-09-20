import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Products } from "../redux/reducers/productsReducer";
import { add_to_favorite } from "../redux/reducers/favoriteReducer";
import { useAppDispatch } from "../redux/hooks";

interface Props {
  data: Products;
  deleteHandler: (data: string | undefined) => void;
  page?: string;
}

/**---------------v-------component-------v---------------------- */
const ProductCard: React.FC<Props> = ({ data, deleteHandler, page }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div
      className="shadow-2xl border border-y-indigo-300 h-96 flex flex-col
                 justify-between rounded-xl bg-white  hover:cursor-pointer"
      onClick={(event) => {
        event.stopPropagation();
        navigate(`/product/${data["_id"]}`);
      }}
    >
      <div className="h-1/2 p-1">
        <img className="h-full m-auto" src={data.avatar} alt="" />
      </div>
      <div className="p-7 relative bottom-0 w-full h-1/2">
        <h3 className="font-medium">{data.name}</h3>
        <div className="absolute w-[calc(100%-3rem)] bottom-7 gap-2 bg-white ">
          <h3 className="font-extrabold mb-3">
            <span className="font-medium">₹</span> {data.price}
          </h3>
          <div className="flex justify-end gap-3 items-center">
            <button
              className="px-2 rounded-xl border border-red-500 text-red-500
               hover:bg-red-500 hover:text-white focus:bg-red-800"
              onClick={(event) => {
                event.stopPropagation();
                deleteHandler(data["_id"]);
              }}
            >
              {page === "favorite" ? "remove" : "delete"}
            </button>
            {page !== "favorite" ? (
              <button
                className="p-1 rounded-full border border-red-600 text-red-600
                 hover:bg-red-500 hover:text-white"
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch(add_to_favorite(data));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
