import React from 'react'

const Pagination = ({pageCount,updatePage}) => {
  console.log(updatePage)
  return (
    <div className='container pages'>
      <h1>
        {
          [...Array(pageCount).keys()].map(value =>{
            return <button 
              key={value} 
              onClick={()=>updatePage(value+1)}
              className='btn chip'>{value+1}
            </button>
          })
        }
        </h1>
    </div>
  )
}

export default Pagination;
