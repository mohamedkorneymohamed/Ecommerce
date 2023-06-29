import React from "react";
import style from "./Footer.module.css";
import amazon from "../../assets/amazon.svg";
import masterCard from "../../assets/mastercard.svg";
import paypal from "../../assets/paypal.svg";
import apple from "../../assets/apple.svg";
import playstore from "../../assets/playstore.svg";
import american from "../../assets/american-express.svg";
export default function Footer() {
  return (
    <>
      <footer className="bg-light py-4">
        <div className="container  ">
          <h3 className="text-main">Get the fresh cart</h3>
          <span>
            we will send you alink, open it in your phone to download the app
          </span>
          <div className="row  py-3">
            <div className="col-md-12 col-lg-9">
              <input
                type="email"
                className="form-control"
                placeholder="Email...."
              />
            </div>
            <div className="col-md-12 col-lg-3 ">
              <button className="btn bg-main text-white px-3 fs-sm-1">
                {" "}
                Share App Link
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <ul className="list-inline ">
                <li className="list-inline-item text-success fw-bold ">
                  {" "}
                  Pyment Partners
                </li>
                <li className="list-inline-item">
                  {" "}
                  <img src={amazon} alt="" />
                </li>
                <li className="list-inline-item">
                  {" "}
                  <img src={masterCard} alt="" />
                </li>
                <li className="list-inline-item">
                  {" "}
                  <img src={paypal} alt="" />
                </li>
                <li className="list-inline-item">
                  {" "}
                  <img src={american} alt="" />
                </li>
              </ul>
            </div>
            <div className="col-md-12 col-lg-6 ">
              <div className="row">
                <div className="col-md-6 text-start">
                  <span className="text-success fw-bold ">
                    Get Deliveries With FreshCart
                  </span>
                </div>
                <div className="col-md-6">
                  <ul className="list-inline">
                    <li className="list-inline-item w-25">
                      <img
                        src={playstore}
                        className="w-100  img-fluid"
                        alt=""
                      />
                    </li>
                    <li className="list-inline-item w-25">
                      <img src={apple} className="w-100 img-fluid" alt="" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
