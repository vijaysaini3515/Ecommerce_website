import React, { useState } from 'react'
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';
import Checkout from '../Components/Checkout'

const Cart = () => {
  const [checkout, setCheckout] = useState(false);
  const {isEmpty,items,cartTotal,removeItem} =useCart();
  const jwt = localStorage.getItem('jwt');
  console.log(items)
  if(isEmpty) return <h1>your cart is empty</h1>

  if(checkout){
    return(
      <div className='container'>
        <h4>Payment Getaway</h4>
        <Checkout /> <br />
        <button className='btn red' onClick={()=>setCheckout(false)}>cancel</button>
      </div>
    )
  }
  
  return (
    <div>
      <div className='container row'>        
        <ul style={{background:"#fff"}} className="collection col m8">
          {
            items.map((item,i)=>{
              return(
                <li key={i} className='collection-item avatar'>
                  <img src={item.img} className='circle' alt="items" />
                  <span style={{backgroundColor:"white",color:"black",fontSize:"20px"}} className='title'>{item.name}</span>
                  <p style={{backgroundColor:"white",color:"black"}} className='green-text'>Price - ₹ {item.price} *{item.quantity} = ₹ {item.itemTotal}</p>
                  <i onClick={()=>removeItem(item.id)} style={{backgroundColor:"#fff",cursor:"pointer"}} className='secondary-content material-icons red-text'>remove_circle</i>
                </li>
              )
            })
          }
        </ul>

        <div className='col m3 offset-m1' style={{position:"sticky",top:"2px"}}>
          <h3>Total Price</h3>
          <h5>₹{cartTotal}</h5>
          {
            jwt ?
                 
                 <button className='btn blue' onClick={()=>setCheckout(true)}>checkout</button>
                :
                <Link to="/signup">
                  <p className='red-text'>SingUp first then checkout</p>
                 <button className='btn blue'>checkout</button>
                </Link>
          }
        </div>
      </div>
    </div>
  )
}

export default Cart
