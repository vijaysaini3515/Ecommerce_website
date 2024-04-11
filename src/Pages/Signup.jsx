import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../GraphQl/Mutation';
import{useNavigate} from 'react-router-dom'

const Signup = () => {
  const[formData,setFormData] = useState({});
  const[signupUser,{loading,data,error}] = useMutation(SIGNUP_USER);
  const navigate = useNavigate()


  if(loading) return <h2>siginin Up ....</h2>
  if(data){
    localStorage.setItem("jwt",data.register.jwt)
    navigate("/")
  }


  const handleChange =(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    signupUser({
      variables:{
        input:formData
      }
    })
  }

  return (
    <div className='container'  style={{maxWidth:'500px'}}>
      {
        error && <div className='card-penal red'>{error.message}</div>
      }
      <h3>Signup</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Enter Username'
          name="username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder='Enter Email'
          name="email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder='Enter Password'
          name="password"
          onChange={handleChange}
          required
        />
        <button type='submit' className='btn blue'>SignUp</button>
      </form>
    </div>
  )
}

export default Signup
