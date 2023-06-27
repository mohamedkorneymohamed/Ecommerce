import React, { useState } from 'react'
import CategorySlider from '../CategorySlider/CategorySlider'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import sale from '../../assets/images/sale.webp'

import style from './Home.module.css'

export default function Home() {
  
  return <>
      <div className='container '>
        <div className="row ">
          <div className="col-md-12 p-0">
            <img src={sale} className='w-100 h-75 ' alt="" />
          </div>
        </div>
      <div className='row '>
        <CategorySlider/>
        <FeaturedProducts/>
      </div>
    </div>
  </>

  
}
