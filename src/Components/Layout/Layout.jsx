import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout({userData , setUserData}) {
  let navigate = useNavigate()
function logOut(){
  localStorage.removeItem('userToken')
  setUserData(null)
  navigate('/login')

}
  return <>
  <Navbar logOut={logOut} setUserData={setUserData} userData={userData}/>
  <Outlet></Outlet>
  <Footer/>
    </>
   
  
}
