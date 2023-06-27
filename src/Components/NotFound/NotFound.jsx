import React from 'react'
import style from './NotFound.module.css'
import error from '../../assets/error.svg'
export default function NotFound() {
  return <>
  <div className='container text-center'>

    <img src={error} className='w-50 ' alt="" />
  </div>
  </>
  }
