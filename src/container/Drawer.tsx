import React from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";
import { set_drawer_open } from "../redux/reducers/productsReducer";
import { useNavigate } from "react-router-dom";

const Drawer: React.FC = () => {
  const navigate = useNavigate();
  const { isDrawerOpen, allCategory } = useAppSelector((state: RootState) => {
    return state.products;
  });
  const dispatch = useAppDispatch();
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isDrawerOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isDrawerOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <div className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <div
            className="float-right w-full p-5"
            onClick={() => {
              dispatch(set_drawer_open(false));
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 float-right"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <ul className="">
            <li
              className="py-3 px-9 hover:bg-gray-200 font-bold"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              className="py-3 px-9 hover:bg-gray-200 font-bold"
              onClick={() => {
                navigate("/watch-list");
              }}
            >
              Watch list
            </li>
            <li className="py-3 px-9">
              <li
                className="py-3 px-9 hover:bg-gray-200 font-bold bg-gray-100"
                onClick={() => {
                  navigate("/watch-list");
                }}
              >
                Categories
              </li>
              <ul className="">
                {allCategory.map((item) => {
                  return (
                    <li
                      className="py-3 px-9 hover:bg-gray-200"
                      onClick={() => {
                        navigate(`/category/${item.name}`);
                      }}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="py-3 px-9">
              <button
                className="bg-indigo-500 px-4 py-1 rounded-2xl
            text-white hover:bg-indigo-800"
                onClick={() => {
                  navigate("/add-product");
                }}
              >
                create
              </button>
            </li>
          </ul>
        </div>
      </section>

      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          dispatch(set_drawer_open(false));
        }}
      ></section>
    </main>
  );
};

export default Drawer;
