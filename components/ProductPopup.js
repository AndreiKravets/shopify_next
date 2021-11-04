import React, {useState} from 'react'
import {client} from "../utils/shopify";
import cart_store from "../store/cart_store";

export default function ProductPopup ({product}) {
     const initOptions = []
    product.options.map((option) => {
        const name = option.name
        const value = option.values[0].value
        const firstOptions = { name, value}
        initOptions.push(firstOptions)
    })
    const [options, setOptions] = useState(() => initOptions)
    const [price, setPrice] = useState(() => product.variants[0].price)
    const [variants, setVariants] = useState(() => product.variants[0])
    const [quantity, setQuantity] = useState(1)



   function onVar (e, name, value, variants) {
        var x = document.getElementById(name).querySelectorAll(".active");
        x[0].classList.remove('active');
        e.target.className = "active";
        const options_click = options
        for (let key in options_click) {
            if (options_click[key].name == name){
                options_click[key].value = value
            }
        }
       setOptions(options_click)


        let count = 0
        for (let key in variants) {
            for (let index in variants[key].selectedOptions) {
                if (variants[key].selectedOptions[index].name == options[index].name && variants[key].selectedOptions[index].value == options[index].value)
                {
                    count += 1
                    if (count == options.length) {
                        console.log(variants[key])
                        setPrice(variants[key].price)
                        setVariants(variants[key])
                        return false
                    }
                    continue
                }
                else{
                    count=0
                }
            }
        }
       setVariants(variants)
    }

    const addToCart = async () => {
        const storage = window.localStorage;
        let checkoutId = storage.getItem("checkoutId");
        console.log(checkoutId);
        if (!checkoutId) {
            const checkout = await client.checkout.create();
            checkoutId = checkout.id;
            storage.setItem('checkoutId', checkoutId);
        }
        const cart = await client.checkout.addLineItems(checkoutId, [{
            variantId: variants.id,
            quantity: quantity
        }])
        storage.setItem('cart', JSON.stringify(cart))
        console.log(cart)
        cart_store.setCount(cart.lineItems.length)
    };


    return(
        <div className="popup_inner" onClick={e => e.stopPropagation()}>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        {product.images.map((iage,index) => {
                            return (
                                <img src={iage.src} key={index}/>

                            )
                        })}
                    </div>
                    <div className="col-6">
                        <p className="product_title">{product.title}</p>
                        <h4 className="product_price">{price}</h4>
                        <div>
                            {product.options.map((option, index) => {
                                return (
                                    <div className="popup_product_options" key={index}>
                                        <div><span>{option.name}</span></div>
                                        <ul id={option.name}>
                                            { option.values.map((val, index) => {
                                                if (index == 0) {
                                                    return (
                                                        <li
                                                            key={index}
                                                            className= "active btn"
                                                            onClick = {(e) => {
                                                               onVar(e, option.name, val.value, product.variants)
                                                            }}>
                                                            {val.value}
                                                        </li>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <li key={index}
                                                            className= 'btn'
                                                            onClick = {(e) => {
                                                                onVar(e, option.name, val.value, product.variants)
                                                            }}>
                                                            {val.value}
                                                        </li>
                                                    )
                                                }
                                            })}
                                        </ul>
                                    </div>

                                )
                            })}
                        </div>

                        <button className="popup_add_to_cart" onClick={addToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}