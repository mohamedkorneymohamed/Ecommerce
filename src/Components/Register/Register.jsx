import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Register.module.css";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLodaing] = useState(false);
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "minimum name 3 char ")
      .max(15, "maxmum name 15 char"),
    email: Yup.string().required("Email is required").email("email invalid"),
    password: Yup.string()
      .required("Password is requird")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password must start with UpperCase"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "rePassword not match"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, " phone not match"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: sendRegisterData,
  });
  let navigate = useNavigate();
  async function sendRegisterData(values) {
    setLodaing(true);
    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values)
      .catch((error) => {
        setLodaing(false);
        setError(
          `${error.response.data.errors.param} : ${error.response.data.errors.msg}`
        );
      });
    if (data.message === "success") {
      setLodaing(false);
      navigate("/login");
    }
  }

  return (
    <>
        <div className="container">
          <div className="row py-4">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <div className="titleRegister">
                <h2 className="text-main text-capitalize">create account</h2>
              </div>
              <div className="contentRegister">
                <form onSubmit={formik.handleSubmit}>
                  {error ? (
                    <div className="alert alert-danger">{error}</div>
                  ) : (
                    ""
                  )}
                  <div className="contentInput">
                    <div className="row">
                      <div className="col-md-1 icon">
                        <i className="fa-solid fa-user "></i>
                      </div>
                      <div className="col-md-11 input">
                      <input
                    type="email"
                    name="email"
                    id="email"
                    className=" "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="alert alert-danger">
                      {formik.errors.email}
                    </div>
                  ) : (
                    ""
                  )}
                      </div>
                    </div>
                  </div>


                  <div className="contentInput">
                    <div className="row">
                      <div className="col-md-1 icon">
                        <i className="fa-solid fa-user "></i>
                      </div>
                      <div className="col-md-11 input">
                      <input
                    type="password"
                    name="password"
                    id="password"
                    className=" "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className="alert alert-danger">
                      {formik.errors.password}
                    </div>
                  ) : (
                    ""
                  )}
                      </div>
                    </div>
                  </div>

   
                  <div className="contentInput">
                    <div className="row">
                      <div className="col-md-1 icon">
                        <i className="fa-solid fa-user "></i>
                      </div>
                      <div className="col-md-11 input">
                      <input
                    type="password"
                    name="rePassword"
                    id="rePassword"
                    className=" "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rePassword}
                  />
                  {formik.errors.rePassword && formik.touched.rePassword ? (
                    <div className="alert alert-danger">
                      {formik.errors.rePassword}
                    </div>
                  ) : (
                    ""
                  )}
                      </div>
                    </div>
                  </div>

                  <div className="contentInput">
                    <div className="row">
                      <div className="col-md-1 icon">
                        <i className="fa-solid fa-user "></i>
                      </div>
                      <div className="col-md-11 input">
                      <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className=" "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <div className="alert alert-danger">
                      {formik.errors.phone}
                    </div>
                  ) : (
                    ""
                  )}
                      </div>
                    </div>
                  </div>


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
                      className=" btn bg-main text-white mt-3"
                    >
                      Register
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
}