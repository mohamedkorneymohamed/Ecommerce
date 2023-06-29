import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { cartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";
import style from "./Cart.module.css";
import { Helmet } from "react-helmet";
export default function Cart() {
  //*-------------------------------------------------- Get All Function Cart By useContext   -------------------------------------------------
  let {
    getLoggedUserCart,
    deleteCartDetails,
    setCartNumber,
    updateProductCount,
  } = useContext(cartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [isloading, setIsloading] = useState(false);
  //*-------------------------------------------------- Get All Products Added To Cart  -------------------------------------------------

  async function getCart() {
    setIsloading(true);
    let response = await getLoggedUserCart();
    if (response?.data?.status === "success") {
      setCartDetails(response.data.data);
      setIsloading(false);
    }
  }
  //*-------------------------------------------------- Delete Spesific Product From Cart   -------------------------------------------------

  async function deleteProduct(productId) {
    let response = await deleteCartDetails(productId);
    setCartDetails(response.data.data);
    toast.success("remove");
    setCartNumber(response.data.numOfCartItems);
  }
  //*-------------------------------------------------- Update Product Quantity From Cart   -------------------------------------------------

  async function updateProductQuantity(productId, count) {
    let response = await updateProductCount(productId, count);
    setCartDetails(response.data.data);
    toast.success("product count updated");
    setCartNumber(response.data.numOfCartItems);
  }
  //*-------------------------------------------------- Call Function (getCart) In did Mount phase  -------------------------------------------------

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {" "}
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
          {/*----------------------------------- Display All Selected Product In Card---------------------------------- */}
          <Helmet>
            <title>Cart Details</title>
          </Helmet>
          {cartDetails ? (
            <div className=" vh-100 bg-main-light p-4">
              <h3>Shop Cart :</h3>
              <h6 className="text-main">
                {" "}
                Total Cart Price :{cartDetails.totalCartPrice}EGP
              </h6>
              {cartDetails.products.map((product) => (
                <div
                  key={product?.product?._id}
                  className="row py-2 my-2 align-items-center"
                >
                  <div className="col-md-1">
                    <img
                      src={product?.product?.imageCover}
                      className="w-100"
                      alt=""
                    />
                  </div>
                  <div className="col-md-11 d-flex justify-content-between ">
                    <div>
                      <h6>{product?.product?.title}</h6>
                      <h6 className="text-main"> price :{product?.price}</h6>
                      <button
                        onClick={() => deleteProduct(product?.product?._id)}
                        className="btn text-danger"
                      >
                        <i className="fa-regular fa-trash-can"></i> remove
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          updateProductQuantity(
                            product?.product?._id,
                            product.count + 1
                          )
                        }
                        className="btn btn-info btn-sm"
                      >
                        +
                      </button>
                      <span className="mx-2">{product.count}</span>
                      <button
                        onClick={() =>
                          updateProductQuantity(
                            product?.product?._id,
                            product.count - 1
                          )
                        }
                        className="btn btn-info btn-sm"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn bg-main">
                <Link className="text-white" to={"/checkout"}>
                  Checkout
                </Link>
              </button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
