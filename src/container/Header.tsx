import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { get_all_category_api, api_token } from '../constants/api'
import { category_button_handler, get_all_category } from '../redux/reducers/productsReducer'
import { RootState } from '../redux/store'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { allCategory, isCategoryButtonOpen } = useSelector((state: RootState) => {
    return state.products;
  })

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(get_all_category_api,
      {headers:{
        Authorization: `Bearer ${api_token}`
      }}).then((res) => {
      dispatch(get_all_category(res.data.categories
        ))
    })
  }, [])
  
  return (
    <nav className="z-10 bg-white px-14 drop-shadow-lg fixed w-full flex items-center h-16 justify-between">
      {/* <div className="container "> */}
        <h3 className="text-2xl font-extrabold hover:cursor-pointer text-purple-500"
          onClick={()=>{
            navigate('/')
          }}
        >Product</h3>
        <ul className="flex gap-9 items-center">
        <li className='relative'>
            <div className="px-2 py-1  hover:cursor-pointer"
            onClick={()=>{
              navigate('/')
            }}>
            <span className="flex items-center gap-1">
              Home
            </span>
            </div>
          </li>
        <li className='relative'>
            <div className="px-2 py-1  hover:cursor-pointer"
            onClick={()=>{
              navigate('/watch-list')
            }}>
            <span className="flex items-center gap-1">
              Watch list
            </span>
            </div>
          </li>
          <li className='relative'>
            <div className="px-2 py-1 hover:cursor-pointer"
            onClick={()=>{
              // setIsOpen(!isOpen);
              dispatch(category_button_handler(!isCategoryButtonOpen));
            }}>
            <span className="flex items-center gap-1">
              category
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
            </div>
            {isCategoryButtonOpen ?
              <div className="absolute bg-white border rounded-md pt-3">
              <ul>
              {allCategory.length === 0 ? <div>loading</div> :
              
              allCategory.map((item)=>{
                return <li className="py-2 px-8 hover:cursor-pointer hover:bg-gray-300"
                key={item['_id']}
                onClick={()=>{
                  navigate(`/category/${item.name}`)
                }}>{item.name}</li>
              })}
              </ul>
            </div> : null}
          </li>
          <li>
            <button className="bg-indigo-500 px-4 py-1 rounded-2xl
            text-white hover:bg-indigo-800"
            onClick={()=>{
              navigate('/add-product')
            }}>create</button>
          </li>
        </ul>
      {/* </div> */}

    </nav>
  )
}

export default Header