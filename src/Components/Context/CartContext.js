import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export let cartContext = createContext();

// -----------------------------
let headers = { token: localStorage.getItem("userToken") };
// ---------------------------------
export function CartContext(props) {
  const [cartId, setcartId] = useState(0);
  const [cartNumber, setCartNumber] = useState(0);

  async function getCart() {
    let response = await getLoggedUserCart();
    if (response?.data?.status === "success") {
      setCartNumber(response.data.numOfCartItems);
      setcartId(response.data.data._id);
    }
  }
  useEffect(() => {
    console.log("effect 0")
    // if(loggedIn)
    if(localStorage.getItem('userToken'))
      getCart();
  }, []);

  // ---------------------------
  function addToCart(productId) {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  // ------------------------------------
  function getLoggedUserCart() {
    return axios
      .get(`https://route-ecommerce.onrender.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  // ------------------------------------

  function deleteCartDetails(productId) {
    return axios
      .delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function updateProductCount(productId, count) {
    return axios
      .put(
        `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function onlinePyment(cartId, shippingAddress) {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          shippingAddress: shippingAddress,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  // --------------------------------------------------------

  return (
    <cartContext.Provider
      value={{
        setCartNumber,
        cartId,
        cartNumber,
        addToCart,
        getLoggedUserCart,
        deleteCartDetails,
        updateProductCount,
        onlinePyment,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
