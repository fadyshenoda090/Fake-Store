import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
  const cart= useSelector((state)=>state.cart.cartItems)

  console.log(cart);

  return (
    <div>
      cart
    </div>
  )
}

export default Cart
