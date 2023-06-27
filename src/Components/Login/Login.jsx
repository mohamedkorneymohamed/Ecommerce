import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './Login.module.css'
export default function Login({saveUserData}) {
  const [error, setError] = useState('')
  const [loading, setLodaing] = useState(false)
let validationSchema =Yup.object({
  email:Yup.string().required('Email is required').email('email invalid'),
  password:Yup.string().required('Password is requird').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must start with UpperCase'),
})
  let formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },validationSchema
    ,onSubmit:sendLoginData
  })
  let navigate = useNavigate()
 async function sendLoginData(values){
   setLodaing(true)
let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',values).catch((error)=>{
  setLodaing(false)
setError(`${error.response.data.errors.param} : ${error.response.data.errors.msg}`)
})
if(data.message === 'success' ){
  localStorage.setItem('userToken' , data.token)
  saveUserData()
  setLodaing(false)
  navigate('/')
}
  }

  return <>
  <div className="w-70 mx-auto vh-100">
<h2>Login now</h2>
<form onSubmit={formik.handleSubmit}>
{error?<div className='alert alert-danger'>{error}</div>:""}

  <label htmlFor="email">Email :</label>
  <input type="email" name='email' id='email' className='form-control my-2' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
  {formik.errors.name && formik.touched.name?<div className='alert alert-danger'>{formik.errors.name }</div>:"" }

  <label htmlFor="password">Password :</label>
  <input type="password" name='password' id='password' className='form-control my-2' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
  {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email }</div>:"" }


  {loading?<button  type='button' className='btn bg-main text-white  mt-3'><i className='fas fa-spinner fa-spin '></i></button>:
  <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white  mt-3'>Login</button>}</form>
  </div>
  </>
  
}
