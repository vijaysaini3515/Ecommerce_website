import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../GraphQl/Mutation';
import {useNavigate} from 'react-router'

const Login = () => {
  const [formData,setFormData]=useState({});
  const [loginUser,{loading,data,error}] = useMutation(LOGIN_USER);
  const navigate = useNavigate()

  if(loading) return <h2>Loggin in....</h2>
  if(data){
    localStorage.setItem("jwt",data.login.jwt);
    navigate("/")
  }
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    loginUser({
      variables:{
        input: formData
      }
    })
    console.log(data)
  }


  return (
    <div className='container' style={{maxWidth:"500px"}}>
      {error && <div className='card-panel red'>{error.message}</div>}
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder='Enter username and email'
          name="identifier"
          onChange={handleChange}
          required

        />
        <input 
          type="password"
          placeholder='Enter password'
          name="password"
          onChange={handleChange}
          required
        />
        <button type='submit' className='btn blue'>LogIn</button>
      </form>
    </div>
  )
}

export default Login
