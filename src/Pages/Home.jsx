import React, { useEffect, useState } from 'react';
import {useQuery} from '@apollo/client'
import { GET_ALL_PRODUCTS } from '../GraphQl/Queries';
import Card from '../Components/Card';
import '../App.css';
import Searchbar from '../Components/Searchbar';
import Pagination from '../Components/Pagination';


const Home = () => {
  const [page,setPage] = useState(1)
  const {loading,data,error,refetch}  = useQuery(GET_ALL_PRODUCTS,{
    variables:{
      "pagination": {
        "page": page,
        "pageSize": 4
      }
    }
  });

  useEffect(()=>{
    if(page != 1){
      refetch()
    }
  },[page])


  const updatePage =(page)=>{
    setPage(page);
  }

  if(loading)return <h1>loading</h1>
  if(data){
    console.log(data)
  }
  if(error){
    console.log(error.message)
  }
  return (
    <div>
      <Searchbar />
      <div className='home_root'>
        {
          data.products.data.map(({id,attributes})=>{
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
      <Pagination 
         pageCount={data.products.meta.pagination.pageCount}
         updatePage = {updatePage}
      />
    </div>
  )
}

export default Home
