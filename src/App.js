
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Cart from './Components/Cart/Cart'
import Checkout from './Components/Checkout/Checkout'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Brands from './Components/Brands/Brands'
import NotFound from './Components/NotFound/NotFound'
import ProtectRouter from './Components/ProtectRouter/ProtectRouter'
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { CounterContextProvider } from './Components/Context/CounterContext';
import { CartContext } from './Components/Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { Offline, Online } from "react-detect-offline";
export default function App() {
useEffect(() => {
  if(localStorage.getItem('userToken')!==null){
    saveUserData()
  }
}, [])

  const [userData, setUserData] = useState(null)
  function saveUserData(){
    let encodedToken = localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodedToken)
    setUserData(decodedToken)
  }
  let routers = createBrowserRouter([
    {path:'' , element:<Layout setUserData={setUserData} userData={userData}/> , children:[
      {index:true , element:<Home/>},
      {path:'*' , element:<ProtectRouter><NotFound/></ProtectRouter>},
      {path:'cart' , element:<ProtectRouter><Cart/></ProtectRouter>},
      {path:'checkout' , element:<ProtectRouter><Checkout/></ProtectRouter>},
      {path:'productdetails/:id' , element:<ProtectRouter><ProductDetails/></ProtectRouter>},
      {path:'brands' , element:<ProtectRouter><Brands/></ProtectRouter>},
      {path:'login' , element:<Login saveUserData={saveUserData}/>},
      {path:'register' , element:<Register/>},
      
    ]}
  ])
  return <>
  <CartContext>
    <Toaster/>
  <CounterContextProvider>
    <Offline> <div className='network'> <i className="fa-solid fa-wifi"></i> Only shown offline (surprise!)</div> </Offline>
    <RouterProvider router={routers}></RouterProvider >
    </CounterContextProvider>
  </CartContext>

  
  
  </>

}

