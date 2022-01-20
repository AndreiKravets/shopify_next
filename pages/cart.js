import React, {useState, useEffect} from 'react';
import {shopifyClient} from "../utils/shopify"
import Router, {useRouter} from 'next/router';
import {BsTrash} from "react-icons/bs";
import MainContainer from "../components/MainContainer";
import {observer} from "mobx-react-lite";
import cart_store from "../store/cart_store";


const Cart = observer(() => {

    const [loaded, setLoaded] = useState(true)
    const [cart, setCart] = useState('')
    const [cart_arr, setCartArr] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [variants, setVariants] = useState('')


    useEffect(() => {

        function cartInit() {
            setCart((window.localStorage, JSON.parse(window.localStorage.getItem("cart"))))
            setCartArr((window.localStorage, JSON.parse(window.localStorage.getItem("cart")).lineItems))
        }

        if (loaded) {
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

    const updateCart = async (variantsId, new_quantity) => {
        const storage = window.localStorage;
        const checkoutId = storage.getItem("checkoutId");
        const lineItemsToUpdate = [
            {
                id: variantsId,
                quantity: new_quantity
            }
        ];
        const cart = await shopifyClient.checkout.updateLineItems(checkoutId, lineItemsToUpdate)
        storage.setItem('cart', JSON.stringify(cart))
        let cart_arr = cart.lineItems
        setCart(cart)
        setCartArr(cart_arr)
    };


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
                    console.log(cart)
                    return (
                        <div className="row cart_row" key={key}>
                            <div className='col-lg-7 cart_row_left'>
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
                                                updateCart(item.id, item.quantity - 1)
                                            }}>-
                                        </li>
                                        <li className="quantity_li"><input
                                            type="number"
                                            actionPosition='left'
                                            defaultValue='1'
                                            value={item.quantity}
                                        /></li>
                                        <li className='btn'
                                            onClick={(e) => {
                                                updateCart(item.id, item.quantity + 1)
                                            }}>+
                                        </li>
                                    </ul>
                                    <div className="cart_trash">
                                        <BsTrash onClick={(e) => {
                                            del_product(e, item.id)
                                            updateCart(item.id, 0)
                                        }}/>
                                    </div>
                                </div>
                                <h5>${item.variant.price * item.quantity}</h5>
                            </div>
                        </div>
                    )
                })}
                <row className="row cart_subtotal_row">
                    <div className="col">
                        <h6><span>Subtotal</span> ${cart.subtotalPrice} USD</h6>
                        <button className="btn_checkout" onClick={checkout}>Checkout</button>
                    </div>
                </row>
            </div>
        </MainContainer>
    )
})

export default Cart;