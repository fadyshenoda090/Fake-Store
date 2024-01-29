import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productsAction, updateProducts } from '../../store/slices/products'
import { productDetailsAction } from '../../store/slices/productDetails'
import { IoIosStar } from "react-icons/io";
import { IoBasketSharp } from "react-icons/io5";
import { FaSlash } from "react-icons/fa";
import { themeContext } from '../../contexts/ThemeContext';
import ReactImageMagnify from 'react-image-magnify';
import { useNavigate } from 'react-router-dom';
import { decreaseCounter, increaseCounter } from '../../store/slices/counter';
import { addToCart, removeFromCart } from '../../store/slices/cart';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const [addedToCart, setAddedToCart] = useState(false)
  const loading = useSelector(state => state.products.loading)
  const products = useSelector(state => state.products.products)
  // const deets = useSelector(state => state.productDetails.product)
  const cart = useSelector(state => state.cart.cartItems)
  const { theme } = useContext(themeContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(productsAction())
  }, [])
  
  const toggleAddTocartState = (id) => {
    const isAddedToCart = cart.some((cartItem) => cartItem.id === id);
  
    if (isAddedToCart) {
      dispatch(removeFromCart({ id }));
      dispatch(decreaseCounter());
    } else {
      dispatch(addToCart({ id }));
      dispatch(increaseCounter());
    }
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, isAddedToCart: !isAddedToCart };
      }
      return product;
    });
  
    dispatch(updateProducts(updatedProducts));
  };
  

  return (
    <>
      {loading ? <div className='min-h-screen flex justify-center items-center'>
        <div className='flex justify-center items-center'>
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          </div>
        </div>
      </div> :
        <div className='grid grid-cols-9'>
          <Toaster position='top-right' />
          <div className='md:col-span-1 md:block dark:text-white hidden border'>
            sideBar
          </div>
          <div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3 px-5 py-1 md:col-span-8 col-span-9 border'>
            {products?.map((product) => {
              return (
                <div className={`col-span-1 ${theme == 'dark' ? 'bg-[#403541]' : ' bg-neutral-300'} p-2 rounded-lg space-y-1 h-[26rem] flex flex-col`} key={product.id}>
                  <div className='relative'>
                    <img className='h-[15rem] w-full rounded-t-lg object-fit' src={product.images?.[0]} alt={product.title} />
                    <span>
                    <IoBasketSharp
                        onClick={() => {
                          toggleAddTocartState(product.id);
                          toast.success('Added to cart');
                        }}
                        className={`${
                          product.isAddedToCart
                            ? 'text-red-500'
                            : 'text-green-500'
                        } bg-white rounded-full text-3xl absolute top-2 right-2 md:right-1 lg:right-2 xl:right-1 cursor-pointer`}
                      />
                    </span>
                    <span>
                    {product.isAddedToCart && (
                        <FaSlash
                          onClick={() => {
                            toggleAddTocartState(product.id);
                            toast.error('removed from cart');
                          }}
                          className='text-red-500 bg-transparent rounded-full text-3xl absolute top-2 right-2 md:right-1 lg:right-2 xl:right-1 cursor-pointer'
                        />
                      )}
                    </span>
                  </div>
                  <div className='flex gap-3'>
                    <p className='dark:text-white text-xl font-bold '>{product.title}</p>
                    <span className='dark:text-[#f0ec8b] text-lg text-black flex gap-1'>
                      {product.rating} <IoIosStar className='dark:text-[#f0ec8b] text-amber-400' />
                    </span>
                  </div>
                  <p className='dark:text-white text-lg'>
                    Price : {product.price}&nbsp; <span>L.E</span>
                  </p>
                  <article className='text-elliipses line-clamp-2 text-[1.09rem] dark:text-white'>{product.description}</article>
                  <div className='flex justify-evenly'>
                    <button className='bg-[#f0ec8b] rounded-lg px-3 py-1 text-lg hover:shadow hover:shadow-[#fffaa0] hover:scale-105' onClick={() => { navigate((`/details/${product.id}`)); console.log(deets); }}>
                      Details
                    </button>
                    <button className='bg-[#f0ec8b] rounded-lg px-3 py-1 text-lg hover:shadow hover:shadow-[#fffaa0] hover:scale-105'>Buy now</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      }
    </>
  )
}

export default Home
