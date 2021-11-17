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
            <div className='container'>
                <Head>
                    <title>Create Next App</title>
                </Head>
                <div className="container cart_container">
                    <h1>Cart</h1>

                    {cart_arr.map((item, key) => {
                        return (
                            <div className="row cart_row" key={key}>
                                <div className='col-md-6'>
                                    <h5>{item.title}</h5>
                                    <h6>{item.variant.title}</h6>
                                </div>
                                <div className='col-md-2 cart_row_price'>{item.variant.price}</div>
                                <div className='col-md-1 cart_row_quantity'>{item.quantity}</div>
                                <div className='col-md-2 cart_row_image'><img src={item.variant.image.src} alt=""/></div>
                                <div className='col-1 cart_row_trash'><BiTrashAlt onClick={(e) => {
                                    del_product(e, item.id)
                                }}/></div>
                            </div>
                        )
                    })}
                    <button className="btn_checkout" onClick={checkout}>Checkout</button>
                </div>
            </div>
            </MainContainer>
        )
    })

export default Cart;