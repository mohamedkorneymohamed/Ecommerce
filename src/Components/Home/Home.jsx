import React, { useState } from "react";
import CategorySlider from "../CategorySlider/CategorySlider";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import sale from "../../assets/images/sale.webp";

import style from "./Home.module.css";

export default function Home() {
  return (
    <>
      <div className="container pb-5 ">
        <div className="row ">
          <CategorySlider />
          <div className="sale d-flex justify-content-center pt-5">
            <img src={sale} className=" w-75" alt="" />
          </div>
          <FeaturedProducts />
        </div>
      </div>
    </>
  );
}
