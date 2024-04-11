import React from 'react';
import {useParams} from 'react-router';
import {useQuery} from '@apollo/client'
import { GET_PRODUCT } from '../GraphQl/Queries';
import { BACKEND_URL } from '../Helper';
import Carousel from '@brainhubeu/react-carousel';
import { useCart } from 'react-use-cart';

const Products = () => {
  const {addItem} = useCart();
  const {pid} = useParams();
  const {loading,data,error} = useQuery(GET_PRODUCT,{
    variables:{
      productId:pid
    }
  });

  if(loading)return<h1>loading</h1>
  if(error)console.log(error)
  if(data)console.log(data)
  console.log(pid)

  const description = data.product.data.attributes.description[0].children[0].text;
  const {name,price,images} = data.product.data.attributes
  console.log(images.data[0].attributes.url)
   
  const addToCart =()=>{
    addItem({
      id:pid,
      name:name,
      price:price,
      img:BACKEND_URL+images.data[0].attributes.url
    })
  
  }

  return (
    <div className='container'>
       <Carousel plugins={['arrows']}>
        {
          images.data.map((item)=>{
            console.log(item.attributes.url)
             return <img style={{height:"50vh",margin:"10px"}} className='cimg' src={`${BACKEND_URL+item.attributes.url}`} alt='img'/>
          })
        }
      </Carousel>
     <div>
      <h2 style={{fontWeight:'bolder', fontSize:"25px"}}>{name}</h2>
      <h5 className='green-text' style={{fontWeight:'bolder', fontSize:"20px"}}>₹ {price}</h5>
      <h3 style={{fontSize:'15px'}} className='black-text'>{description}</h3>
      <button className='btn blue' onClick={addToCart}>Add to Cart</button>
     </div>
    </div>
  )
}

export default Products



