import React from 'react'
import { Navigate } from 'react-router-dom'
import style from './ProtectRouter.module.css'

export default function ProtectRouter(props) {
  if(localStorage.getItem('userToken') == null){
    return <Navigate to={'/login'}/>
    
      }
      else{
    return props.children
      }
}
