import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ecommerce from "../../assets/ecommerce.png";
import avatar from "../../assets/avatar.svg";
import style from "./Login.module.css";
export default function Login({ saveUserData }) {
  const [error, setError] = useState("");
  const [loading, setLodaing] = useState(false);
  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("email invalid"),
    password: Yup.string()
      .required("Password is requird")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password must start with UpperCase"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendLoginData,
  });
  let navigate = useNavigate();
  async function sendLoginData(values) {
    setLodaing(true);
    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values)
      .catch((error) => {
        setLodaing(false);
        setError(
          `${error.response.data.errors.param} : ${error.response.data.errors.msg}`
        );
      });
    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      saveUserData();
      setLodaing(false);
      navigate("/");
    }
  }
  useEffect(()=>{

    // if(localStorage.getItem('userToken'))
    //   navigate("/home")
  } , [])

  return (
    <>
      <div className=" mx-auto vh-100">
        <div className="container ">
          <div className="login">
          <div className="row  ">
            <div className="col-md-7 ">
              <div className="ecommerce text-center position-relative">
                <img src={ecommerce} alt="" />
              </div>
            </div>
            <div className="col-md-5 px-0 overflow-hidden">
              <div className="loginScreen ">
              <div className="form position-relative">
                <div className="loginAvatar text-center">
                  <img src={avatar} className="w-25" alt="" />
                </div>
                <div className="title text-center">
                  <h2 className="text-main text-uppercase fw-bolder">
                    Login now
                  </h2>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  {error ? (
                    <div className="alert alert-danger">{error}</div>
                  ) : (
                    ""
                  )}
                  <div className="contentInput row ">
                    <div className="col-sm-1  icon">
                      <i className="fa-solid fa-user "></i>
                    </div>
                    <div className="input col-sm-11">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        placeholder='UserEmail'
                      />
                      {formik.errors.name && formik.touched.name ? (
                        <div className="alert alert-danger ">
                          {formik.errors.name}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="contentInput row">
                    <div className="col-sm-1  icon">
                      <i className="fa-solid fa-lock "></i>
                    </div>
                    <div className=" input col-sm-11">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder='Password'
                      />
                      {formik.errors.email && formik.touched.email ? (
                        <div className="alert alert-danger ">
                          {formik.errors.email}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    {loading ? (
                      <button
                        type="button"
                        className="btn bg-main text-white  mt-3"
                      >
                        <i className="fas fa-spinner fa-spin "></i>
                      </button>
                    ) : (
                      <button
                        disabled={!(formik.isValid && formik.dirty)}
                        type="submit"
                        className="btn bg-main text-white  mt-3 text-uppercase rounded-pill px-5"
                      >
                        login
                      </button>
                    )}
                  </div>
                </form>
              </div>
              </div>

            </div>
          </div>
          </div>

        </div>
      </div>
    </>
  );
}
