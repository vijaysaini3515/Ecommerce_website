import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES } from '../GraphQl/Queries';
import { Link } from 'react-router-dom';

const Category = () => {
  const {loading,data,error} = useQuery(GET_ALL_CATEGORIES);
  if(loading) return <h1>While wait some time ....</h1>
  return (
    <div className='category'>
      {
        data.categories.data.map(({id,attributes})=>{
          return <Link key={id} to={`/category/${id}`}><h4 className='chip btn'>{attributes.name}</h4></Link>
        })
      }
    </div>
  )
}

export default Category;
