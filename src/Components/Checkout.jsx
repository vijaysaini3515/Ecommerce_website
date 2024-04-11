import React, { useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {BACKEND_URL} from '../Helper'

import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import { useCart } from 'react-use-cart';

const stripePromise = loadStripe('pk_test_51P2ddfSA2MkEkWLbiRymwjeTjTtDgnlkR5ZZeH7bs4y0swe8ZmBvDW4MJuTz1kU5E6sr74vF4o7gDAwR1COprPzB00qg5ulMqi');

const CheckoutForm = () => {
  const [formData,setFormData] = useState({});
  const [paymentProcessing,setPaymentProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const {cartTotal,items,emptyCart} = useCart()

  const [payBtn,setPayBtn] = useState(true);
  //{shippingAddress,city,state,pin,items}
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }

    const cardElement = elements.getElement(CardElement)
       const payload = await stripe.createToken(cardElement)
     
       const allFormData = {
           ...formData,
           token:payload.token.id,
           amount:cartTotal,
           items:items
       }
        
       setPaymentProcessing(true);
       await makePaymentRequest(allFormData)
       setPaymentProcessing(false);
       emptyCart();

       console.log(allFormData);
  }

  const makePaymentRequest = async(allFormData)=>{
   try {
      const res = await fetch(`${BACKEND_URL}/api/orders`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer" + localStorage.getItem('jwt')
        },
        body:JSON.stringify(allFormData)
      })
      console.log(res.body)
      return await res.json()

   } catch (err) {
       console.log(err)
       alert('Payment failed')
   }

  }

  if(paymentProcessing) return <h1>Payment is Processing ....</h1>
  
  return (
    <form onSubmit={handleSubmit}>
      <input
       type="text"
       name='shippingAddress'
       placeholder='ShippingAddress'
       onChange={handleChange }
       />

       <input
       type="text"
       name='city'
       placeholder='City'
       onChange={handleChange }
       />

      <input
       type="text"
       name='state'
       placeholder='State'
       onChange={handleChange }
       />

      <input
       type="number"
       name='pin'
       placeholder='Pin Code'
       onChange={handleChange }
       /> 

      <CardElement onChange={(e)=>{
        if(e.complete){
          setPayBtn(false)
        }else{
          setPayBtn(true)
        }
      }}/>
      <br/>
      <button className='blue btn' type="submit" disabled={(!stripe || !elements) || payBtn}>
        Pay
      </button>
       
    </form>
  )
}

const Checkout =()=>{
   return(
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
   )
}

 export default Checkout;



