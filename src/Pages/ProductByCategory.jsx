import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import {GET_PRODUCT_BY_CATEGORY} from '../GraphQl/Queries'
import Card from '../Components/Card'

const ProductByCategory = () => {
  const {cid} = useParams();
   const {loading,data,error} = useQuery(GET_PRODUCT_BY_CATEGORY,{
    variables:{
      categoryId:cid
    }
  })
  if(loading) return <h1>loading category ....</h1>
  return (
    <div className='home_root'>
      {
          data.category.data.attributes.products.data .map(({id,attributes})=>{
            return <Card
                id={id}
                key={id}
                name={attributes.name}
                price={attributes.price}
                description={attributes.description[0].children[0].text}
                img = {attributes.images.data[0].attributes.url}
            />
          })
        }
    </div>
  )
}

export default ProductByCategory
