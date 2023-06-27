import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './Register.module.css'

export default function Register() {

  const [error, setError] = useState('')
  const [loading, setLodaing] = useState(false)
let validationSchema =Yup.object({
  name:Yup.string().required('Name is required').min(3,'minimum name 3 char ').max(15 , 'maxmum name 15 char'),
  email:Yup.string().required('Email is required').email('email invalid'),
  password:Yup.string().required('Password is requird').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must start with UpperCase'),
  rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')] , 'rePassword not match'),
  phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ , ' phone not match')
})
  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },validationSchema
    ,onSubmit:sendRegisterData
  })
  let navigate = useNavigate()
 async function sendRegisterData(values){
   setLodaing(true)
let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',values).catch((error)=>{
  setLodaing(false)
setError(`${error.response.data.errors.param} : ${error.response.data.errors.msg}`)
})
if(data.message === 'success' ){
  setLodaing(false)
  navigate('/login')
}
  }

  return <>
  <div className="w-70 mx-auto">
<h2>Register now</h2>
<form onSubmit={formik.handleSubmit}>
{error?<div className='alert alert-danger'>{error}</div>:""}

  <label htmlFor="name">Name :</label>
  <input type="text" name='name' id='name' className='form-control my-2' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
  {formik.errors.name && formik.touched.name?<div className='alert alert-danger'>{formik.errors.name }</div>:"" }

  <label htmlFor="email">Email :</label>
  <input type="email" name='email' id='email' className='form-control my-2' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
  {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email }</div>:"" }


  <label htmlFor="password">Password :</label>
  <input type="password" name='password' id='password' className='form-control my-2' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
  {formik.errors.password && formik.touched.password?<div className='alert alert-danger'>{formik.errors.password }</div>:"" }


  <label htmlFor="rePassword">rePassword :</label>
  <input type="password" name='rePassword' id='rePassword' className='form-control my-2' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword}/>
  {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-danger'>{formik.errors.rePassword }</div>:"" }


  <label htmlFor="phone">Phone :</label>
  <input type="tel" name='phone' id='phone' className='form-control my-2' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}/>
  {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger'>{formik.errors.phone }</div>:"" }


  {loading?<button  type='button' className='btn bg-main text-white  mt-3'><i className='fas fa-spinner fa-spin '></i></button>:
  <button disabled={!(formik.isValid && formik.dirty)} type='submit' className=' btn bg-main text-white mt-3'>Register</button>}</form>
  </div>
  </>
  
}































// export default function Register(values) {
// const [isLoading, setisLoading] = useState(false)  
// const [error, setError] = useState('')
//   let navigate = useNavigate()
//   async function handelRegister(){
//     setisLoading(true)
// let{data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', values).catch((errr)=>{
//   setisLoading(false)
//   setError(`${errr.response.data.errors.param} : ${errr.response.data.errors.msg}`)
// })
// if(data.message ==='success'){
//   navigate('/login')
// setisLoading(false)
// }
//  }
//   let validationSchema = Yup.object({
//     name:Yup.string().required('Name is required').min(2,'minimum name 3 char ').max(15 , 'maxmum name 15 char'),
//     email:Yup.string().required('Email is required').email('email invalid'),
//     password:Yup.string().required('Password is requird').matches(/^[A-Z][a-z0-9]{5,10}$/ , 'password must start with UpperCase'),
//     rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')] , 'rePassword not match'),
//     phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ , ' phone not match')
//   }) 
//   let formik = useFormik({
//     initialValues:{
//       name: "",
//       email:"",
//       password:"",
//       rePassword:"",
//       phone:""
//   },validationSchema
//   ,onSubmit:handelRegister
//   })
//   return <>
//   <form onSubmit={formik.handleSubmit}>
//   {error?<div className="alert alert-danger">{error}</div>:null}           

//     <label htmlFor="name">Name</label>
//     <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' id='name' type="text" className='form-control'/>
//     {formik.errors.name && formik.touched.name?<div className='alert alert-danger'>{formik.errors.name }</div>:null}
    
//     <label htmlFor="email">Email</label>
//     <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' id='email' type="email"  className='form-control'/>
//     {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email }</div>:null}


//     <label htmlFor="password">Password</label>
//     <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' id='password' type="password" className='form-control'/>
//     {formik.errors.password && formik.touched.password?<div className='alert alert-danger'>{formik.errors.password }</div>:null}


//     <label htmlFor="rePassword">rePassword</label>
//     <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name='rePassword' id='rePassword' type="password" className='form-control'/>
//     {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-danger'>{formik.errors.rePassword }</div>:null}


//     <label htmlFor="phone">Phone</label>
//     <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' id='phone' type="tel" className='form-control'/>
//     {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger'>{formik.errors.phone }</div>:null}


  // {isLoading?<button  type='button' className='btn btn-outline-success  mt-3'><i className='fas fa-spinner fa-spin '></i></button>:
  // <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-outline-success  mt-3'>Register</button>}

// </form>  
//   </>

// }