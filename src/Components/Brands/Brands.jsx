import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isloading, setIsloading] = useState(false);

  //*-------------------------------------------------- Get All Brands From Api By Axios   -------------------------------------------------
  async function getAllBrands() {
    setIsloading(true);

    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/brands`
    );
    setBrands(data.data);

    setIsloading(false);
  }
  //*-------------------------------------------------- Call Function (getAllBrands) In did Mount phase  -------------------------------------------------

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      {/*-------------------------------------------------- Loading Spinner ------------------------------------------------- */}
      {isloading ? (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      ) : (
        <>
          {/*----------------------------------- Display All Brands In Card---------------------------------- */}
          <div className="container py-5">
            <div className="row ">
              {brands.map((brand) => (
                <div key={brand._id} className="col-lg-3 col-md-3 text-center">
                  <div className="brand px-2 py-3">
                    <img src={brand.image} className="w-75 img-fluid" alt="" />
                    <span className="text-main d-block">{brand.name}</span>
                    <div className="d-flex justify-content-between p-2 ">
                      <span>{brand.slug}</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {brand.ratingsAverage}
                      </span>
                    </div>
                    <button className="btn bg-main text-white w-100">
                      Select Brand
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
