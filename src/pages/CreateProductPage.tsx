import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"; 
import { RootState } from "../redux/store";
import axios from "axios";
import { api_token, post_product_api } from "../constants/api";
import { add_new_product } from "../redux/reducers/productsReducer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface formData {
  name?: string;
  price?: number;
  category?: string;
  description?: string;
  avatar?: string;
  developerEmail?: string;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required(),
  category: yup.string().required(),
  description: yup.string().required(),
  avatar: yup.string().url().required(),
  developerEmail: yup.string().email().required(),
})

/*--------------v------component---v---------------------- */

const CreateProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { handleSubmit, 
          register, 
          reset,
          formState:{ errors },
        } = useForm<formData>({
          resolver: yupResolver(schema),
        });

  const { allCategory } = useAppSelector((state: RootState)=>{
    return state.products;
  })
  const formSubmitHandler: SubmitHandler<formData> = async(data: formData) => {
    setIsSubmitting(true);
    setIsError(false);
    await axios.post(post_product_api, data, 
      { headers: {
        Authorization: `Bearer ${api_token}`
      }}).then((res)=>{
      dispatch(add_new_product(res.data.product));
      navigate('/');
    }).catch((err)=>{
      setIsError(true);
    })
    setIsSubmitting(false);
    reset();
  };

  return (
    <div className="py-20 h-screen">
        {isError && <h1 className="text-center text-red-500 font-bold text-lg">Some error happened Retry again</h1> }
      <div className="pb-20 md:container flex items-center justify-center">
        <div className="w-full flex bg-indigo-300 border rounded-xl border-gray shadow-xl h-auto md:w-3/4 p-5">
          <div className="hidden md:flex w-0 md:w-1/2  items-center justify-center text-pink-600">
            <div className="border-2 border-pink-500 rounded-lg p-1">
              <h1 className="font-extrabold text-2xl">Create a product</h1>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-gray-50 px-6 md:px-12 py-8 rounded-3xl shadow-inner">
            <form onSubmit={handleSubmit(formSubmitHandler)}>
              <div className="flex flex-col my-4">
                <label className="pl-6">Name</label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="rounded-xl shadow-inner border-gray-200"
                  placeholder="enter name"
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span> }
              </div>
              <div className="flex flex-col my-4">
                <label className="pl-6">Price</label>
                <input
                  {...register("price", { required: true })}
                  type="number"
                  className="rounded-xl shadow-inner border-gray-200"
                  placeholder="enter price"
                />
                {errors.price && <span className="text-red-500">Price is required</span> }
              </div>
              <div className="flex flex-col my-4">
                <select
                  {...register("category", { required: true })}
                  className="rounded-xl border-gray-200"
                >
                  {allCategory.map((item)=>{  
                    return <option key={item['_id']} value={item.name}>{item.name}</option>

                  })}
                </select>
                {errors.category && <span className="text-red-500">{errors.category.message}</span> }
              </div>
              <div className="flex flex-col my-4">
                <label className="pl-6">email</label>
                <input
                  {...register("developerEmail", { required: true })}
                  type="text"
                  className="rounded-xl shadow-inner border-gray-200"
                  placeholder="enter email"
                />
                {errors.developerEmail && <span className="text-red-500">{errors.developerEmail.message}</span> }
              </div>
              <div className="flex flex-col my-4">
                <label className="pl-6">Image</label>
                <input
                  {...register("avatar", { required: true })}
                  type="text"
                  className="rounded-xl shadow-inner border-gray-200"
                  placeholder="enter image url"
                />
                {errors.avatar && <span className="text-red-500">{errors.avatar.message}</span> }
              </div>
              <div className="flex flex-col my-4">
                <label className="pl-6">Description</label>
                <textarea
                  {...register("description", { required: true })}
                  className="rounded-xl shadow-inner border-gray-200"
                />
                {errors.description && <span className="text-red-500">{errors.description.message}</span> }
              </div>
              <div className="flex flex-col my-4">
                <button
                  type="submit"
                  className={`rounded-2xl mt-2 py-1 shadow-lg ${isSubmitting ? "bg-white border border-green-500 text-green-500" : "bg-green-600 text-white hover:bg-green-700"}`}
                >
                  {isSubmitting ? "Uploading..." : "create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
