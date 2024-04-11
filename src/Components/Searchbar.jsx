import { useLazyQuery } from '@apollo/client';
import React, { useState,useEffect } from 'react'
import { GET_PRODUCTS_BY_NAME } from '../GraphQl/Queries';
import { Link } from 'react-router-dom';

const Searchbar = () => {
  const [nameQuery,setNameQuery] = useState("");
  const [hideResult,sethideResult] = useState(true)
  const [getProduct,{loading,data,error}]  = useLazyQuery(GET_PRODUCTS_BY_NAME,{
    variables:{
      "filters": {
        "name": {
          "startsWith":nameQuery
        }
      }
    }
  });
  
  useEffect(() => {
    if(nameQuery.length != 0){
        getProduct()
        sethideResult(false)
    } else{
        sethideResult(true)
    }
     
  },[nameQuery])

  const handleChange =(e)=>{
    setTimeout(()=>{
      setNameQuery(e.target.value)
    },2000)
  }

  return (
    <div className='container'>
      <div className="input-field">
          <input type="search"  onChange={handleChange} required />
          <label className="label-icon"><i className="material-icons">search</i></label>
          <i className="material-icons">close</i>
        </div>
        <div className='showSuggestion' hidden={hideResult}>
          {
            data && data.products.data.map(({id,attributes} )=>{
               return <Link key={id} to={`/product/${id}`}><h6 style={{padding:"20px"}} className="blue white-text">{attributes.name}</h6></Link> 
            })
          }
        </div>
    </div> 
  )
}


export default Searchbar;
