import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import style from "./CategorySlider.module.css";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);
  const [isloading, setIsloading] = useState(false);
  async function getCategories() {
    setIsloading(true);
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/categories`
    );
    setCategories(data.data);
    setIsloading(false);
  }
  useEffect(() => {
    getCategories();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <>
      {isloading ? (
        <div className="d-flex justify-content-center align-items-center ">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      ) : (
        <Slider {...settings}>
          {categories?.map((category) => (
            <div key={category._id}>
              <img height={200} className="w-100" src={category.image} alt="" />
              <h2 className="h6 pt-2 text-center">{category.name}</h2>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}
