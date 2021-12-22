import React, {useState} from 'react'
import {shopifyClient} from "../utils/shopify";
import cart_store from "../store/cart_store";
import {motion} from "framer-motion";
import Slider from "react-slick";
import Image from "next/image";
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";

const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <BsChevronCompactRight />,
    prevArrow: <BsChevronCompactLeft />
}

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
    const [temp_price, setTempPrice] = useState(() => price)
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
                        setTempPrice((quantity)*variants[key].price)
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
            const checkout = await shopifyClient.checkout.create();
            checkoutId = checkout.id;
            storage.setItem('checkoutId', checkoutId);
        }
        const cart = await shopifyClient.checkout.addLineItems(checkoutId, [{
            variantId: variants.id,
            quantity: quantity
        }])
        storage.setItem('cart', JSON.stringify(cart))
        console.log(cart)
        cart_store.setCount(cart.lineItems.length)
    };

    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return(
        <motion.div initial="hidden" animate="visible" key={product.id} variants={{
            hidden: {
                scale: 1,
                opacity: 0,
                y:-1200,
                rotate: 138,
        },
            visible: {
                scale: [2.4,0.4,1],
                opacity: 1,
                y:0,
                rotate: 0,
                transition:
             { duration: .2, ease: [0.48, 0.15, 0.25, 0.96] }
            },
        }}>
        <div className="popup_inner" onClick={e => e.stopPropagation()}>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <Slider {...settings}>
                        {product.images.map((image,index) => {
                            return (
                            <Image
                                key={index}
                                className="card_product_bg"
                                loader={myLoader}
                                src={image.src}
                                width={500}
                                height={500}
                            />
                            )
                        })}
                        </Slider>
                    </div>
                    <div className="col-6">
                        <p className="product_title">{product.title}</p>
                        <h4 className="product_price">{temp_price}</h4>
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
                        <div className="popup_product_options">
                            <div><span>Quantity</span></div>
                            <ul>
                                <li className= 'btn'
                                    onClick = {(e) => {
                                        quantity <= 1 ?  setQuantity( quantity) : setQuantity(quantity-1)
                                        quantity <= 1 ? setTempPrice(quantity*price) : setTempPrice((quantity-1)*price)
                                    }}>-</li>
                                <li className="quantity_li"> <input
                                    onChange={(e) => {
                                        e.target.value <= 1 ? setQuantity(1) : setQuantity(Number(e.target.value))
                                        e.target.value <= 1 ? setTempPrice(price) : setTempPrice(e.target.value * price)
                                     }
                                    }
                                    type="number"
                                    actionPosition='left'
                                    defaultValue='1'
                                    value={quantity}
                                /></li>
                                <li className= 'btn'
                                    onClick = {(e) => {
                                        setQuantity(quantity+1)
                                        setTempPrice((quantity+1)*price)
                                    }}>+</li>
                            </ul>

                        </div>
                        <button className="popup_add_to_cart" onClick={addToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
        </motion.div>
    )
}