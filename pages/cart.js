import React, {useState, useEffect} from 'react';
import {shopifyClient} from "../utils/shopify"
import Router, {useRouter} from 'next/router';
import { BiTrashAlt } from "react-icons/bi";
import Head from "next/head";
import MainContainer from "../components/MainContainer";
import {observer} from "mobx-react-lite";
import cart_store from "../store/cart_store";


const Cart =  observer( ()=> {

         const [loaded, setLoaded] = useState(true)
         const [cart, setCart] = useState('')
         const [cart_arr, setCartArr] = useState([])
         const [temp_price, setTempPrice] = useState(() => 1)
         const [quantity, setQuantity] = useState(1)


    useEffect(() => {

        function cartInit() {
            setCart((window.localStorage, JSON.parse(window.localStorage.getItem("cart"))))
            setCartArr( (window.localStorage, JSON.parse(window.localStorage.getItem("cart")).lineItems))
        }

        if (loaded){
            cartInit()
            setLoaded(false)
        }
    }, []);




   function del_product(e, id) {
        const storage = window.localStorage;
        const cart = (window.localStorage, JSON.parse(window.localStorage.getItem("cart")))
        let checkoutId = storage.getItem("checkoutId");
        cart.lineItems.map((item, key) => {
            if (item.id == id) {
                cart.lineItems.splice(key, 1)
                let cart_arr = cart.lineItems
                    setCart(cart)
                    setCartArr(cart_arr)
                storage.setItem('cart', JSON.stringify(cart))
                shopifyClient.checkout.removeLineItems(checkoutId, id).then((checkout) => {
                });
            }
        })
       cart_store.setCount(cart.lineItems.length)
    }

        const checkout = async () => {
            Router.push(cart.webUrl)
        };


        return (
            <MainContainer>
                <div className="container cart_container">
                    <h1>Your cart</h1>
                    <div className="row cart_top_row">
                        <div className='col-md-7'>
                            <h6>Product</h6>
                        </div>
                        <div className="col-md-5">
                            <h6>Quantity</h6>
                            <h6>Total</h6>
                        </div>
                    </div>
                    {cart_arr.map((item, key) => {
                        return (
                            <div className="row cart_row" key={key}>
                                <div className='col-md-7 cart_row_left'>
                                    <img src={item.variant.image.src} alt=""/>
                                    <div>
                                        <h5>{item.title}</h5>
                                        <h6>{item.variant.title}</h6>
                                    </div>
                                </div>
                                <div className='col-md-5 cart_row_right'>
                                    <div>
                                        <ul>
                                            <li className='btn'
                                                onClick={(e) => {
                                                    quantity <= 1 ? setQuantity(quantity) : setQuantity(quantity - 1)
                                                    quantity <= 1 ? setTempPrice((quantity * price).toFixed(2)) : setTempPrice(((quantity - 1) * price).toFixed(2))
                                                }}>-
                                            </li>
                                            <li className="quantity_li"><input
                                                onChange={(e) => {
                                                    e.target.value <= 1 ? setQuantity(1) : setQuantity(Number(e.target.value))
                                                    e.target.value <= 1 ? setTempPrice(price) : setTempPrice((e.target.value * price).toFixed(2))
                                                }
                                                }
                                                type="number"
                                                actionPosition='left'
                                                defaultValue='1'
                                                value={quantity}
                                            /></li>
                                            <li className='btn'
                                                onClick={(e) => {
                                                    setQuantity(quantity + 1)
                                                    setTempPrice(((quantity + 1) * price).toFixed(2))
                                                }}>+
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        {item.quantity}
                                        <BiTrashAlt onClick={(e) => {
                                            del_product(e, item.id)
                                        }}/>
                                    </div>
                                    <h5>${item.variant.price}</h5>
                                </div>
                            </div>
                        )
                    })}
                    <button className="btn_checkout" onClick={checkout}>Checkout</button>
                </div>
            </MainContainer>
        )
    })

export default Cart;