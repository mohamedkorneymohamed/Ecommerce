import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";
import logo from "../../assets/logo1.svg";
import { cartContext } from "../Context/CartContext";
import instgram from "../../assets/instgram.svg";
import facebook from "../../assets/facebook.svg";
import linkedin from "../../assets/linkedin.svg";
import youtube from "../../assets/youtube.svg";
import tiktok from "../../assets/tiktok.svg";
export default function Navbar({ userData, logOut }) {
  let { cartNumber } = useContext(cartContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-4 ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            <img src={logo} alt="" className="w-75" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData !== null ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="cart">
                    cart
                  </Link>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <i>
                  <img src={instgram} alt="" />
                </i>
                <i>
                  <img src={facebook} alt="" />
                </i>
                <i>
                  <img src={linkedin} alt="" />
                </i>
                <i>
                  <img src={youtube} alt="" />
                </i>
                <i>
                  <img src={tiktok} alt="" />
                </i>
              </li>
              {userData == null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      <button className="btn bg-main text-uppercase text-white">login</button>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      <button className="btn bg-main text-white text-uppercase">register</button>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <span className="mx-4">
                      {" "}
                      <i className="fas fa-shopping-cart fa-3 text-main"></i>{" "}
                      {cartNumber}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button onClick={logOut} className="nav-link btn bg-main text-white text-uppercase" to="register">
                      Logout{" "}
                    </button>
                  </li>{" "}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
