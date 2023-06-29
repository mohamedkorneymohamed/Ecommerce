import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./ProductDetails.module.css";
import Slider from "react-slick";
import { cartContext } from "../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { addToCart, setCartNumber } = useContext(cartContext);

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response?.data?.status === "success added") {
      console.log(response);
      toast.success(response.data.message);
      setCartNumber(response.data.numOfCartItems);
    } else {
      toast.error("can't added");
      console.log(response);
    }
  }
  let param = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [isloading, setIsloading] = useState(false);
  async function getProductDetails(id) {
    setIsloading(true);
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products/${id}`
    );
    setProductDetails(data.data);
    setIsloading(false);
  }
  useEffect(() => {
    getProductDetails(param.id);
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div className="container">
        <div className="row align-items-center position-relative py-5">
          {isloading ? (
            <div className="vh-100 d-flex justify-content-center align-items-center ">
              <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="col-md-4">
                <Slider {...settings}>
                  {productDetails?.images.map((img, index) => (
                    <img key={index} className="w-100" src={img} />
                  ))}
                </Slider>
              </div>
              <div className="col-md-8">
                <h2>{productDetails?.title}</h2>
                <p className="text-muted p-2">{productDetails?.description}</p>
                <div className="d-flex justify-content-between p-2 ">
                  <span>{productDetails?.price} EGP</span>
                  <span>
                    <i className="fas fa-star rating-color"></i>
                    {productDetails?.ratingsAverage}
                  </span>
                </div>
                <button
                  onClick={() => addProduct(productDetails.subcategory._id)}
                  className="btn bg-main text-white w-100"
                >
                  + Add
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
