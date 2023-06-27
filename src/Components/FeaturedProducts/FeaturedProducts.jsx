import axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';
import style from './FeaturedProducts.module.css'
import {Helmet} from "react-helmet";

export default function FeaturedProducts() {
let { addToCart , setCartNumber } = useContext(cartContext)  
const [isloading, setIsloading] = useState(false)

async function addProduct(productId){
  let response = await addToCart(productId)
if(response?.data?.status === 'success added'){
  console.log(response)
  toast.success(response.data.message)
  setCartNumber(response.data.numOfCartItems)
}else{
  toast.error("can't added")
}

    }
  const [products, setproducts] = useState([])
  async function getProducts(){
    setIsloading(true)
    let  {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`);
    
    setproducts(data.data)
    setIsloading(false)
  }
  
  useEffect(() => {
    
  getProducts()
  }, [])

  return <>
    {isloading?<div className='vh-100 d-flex justify-content-center align-items-center'><div className="spinner">
  <div className="double-bounce1"></div>
  <div className="double-bounce2"></div>
</div></div>: <><Helmet>
            <title>Home Page</title>
          </Helmet>
    {products?.map((product)=> <div key={product._id} className='col-lg-2 col-md-3 text-center '>
      <div className="product px-2 py-3">
<Link to={`/productdetails/${product._id}`}> 
<img src={product.imageCover} className='w-75 img-fluid' alt="" />
<span className='text-main d-block'>{product.category.name}</span>     
<h2 className='h6'>
  {product.title.split(' ').slice(1,3).join(' ')}
</h2>
<div className="d-flex justify-content-between p-2 ">
  <span>{product.price} EGP</span>
  <span><i className='fas fa-star rating-color'></i>{product.ratingsAverage}</span>
</div>
</Link>
<button onClick={()=>addProduct(product._id)} className='btn bg-main text-white w-100'>+ Add</button>
    </div>
      </div>
)}
  </>
}

    </>
 
}
