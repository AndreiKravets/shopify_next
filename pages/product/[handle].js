import React, {Component} from 'react';
import {shopifyClient} from "../../utils/shopify"
import { useState } from "react";
import MainContainer from "../../components/MainContainer";
import cart_store from "../../store/cart_store";
import {observer} from "mobx-react-lite";
import Prismic from "@prismicio/client";
import Image from "next/image";

const Product = observer( ({product, data})=> {
    console.log(product)
    console.log(data)
    var productData = false
    if (data.results.length > 0){
         productData = data.results[0].data
    }

    const initOptions = [];
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
            const checkout = await shopifyClient.checkout.create();
            checkoutId = checkout.id;
            storage.setItem('checkoutId', checkoutId);
        }
        const cart = await shopifyClient.checkout.addLineItems(checkoutId, [{
            variantId: variants.id,
            quantity: quantity
        }])
        storage.setItem('cart', JSON.stringify(cart))
        cart_store.setCount(cart.lineItems.length)
    };

    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }
    return(
        <MainContainer>
            <div className="container single_product_container">
                <div className="row">
                    <div className="col-6 single_product_image">
                        {product.images.map((iage,index) => {
                            return (
                                // <img src={iage.src} key={index}/>
                            <Image
                                loader={myLoader}
                                src={iage.src} key={index}
                                alt={iage.src}
                                width={500}
                                height={500}
                            />

                            )
                        })}
                    </div>
                    <div className="col-6 single_product_content">
                        <h4 className="product_title">{product.title}</h4>
                        <h5 className="product_price">$ {price}</h5>
                        <div>
                            {product.options.map((option, index) => {
                                return (
                                    <div className="product_options" key={index}>
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
                        <div className="single_product_quantity">
                            {/*<input*/}
                            {/*    onChange={(e, {value}) =>*/}

                            {/*            setQuantity(Number(value))*/}
                            {/*      }*/}
                            {/*    type="number"*/}
                            {/*    actionPosition='left'*/}
                            {/*    placeholder='Search...'*/}
                            {/*    defaultValue='1'*/}
                            {/*/>*/}
                        </div>
                        <div className="single_product_btn">
                            <button className="btn_add_to_cart" onClick={addToCart}>Add to cart</button>
                            <button className="btn_favorites" >Favorites</button>
                        </div>

                        <div>
                            <h6>Description & Details</h6>
                           {product.description}
                        </div>
                        <div>
                            {productData == false ? '' :  <h1 style={{color: `${productData.color}`}}>{productData.title[0].text}</h1>}
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
            )

})
export default Product;
export async function getServerSideProps({ query }) {
       const productId = query.handle;
       const product = await shopifyClient.product.fetchByHandle(productId);

       const client = Prismic.client("https://paspartoo.prismic.io/api/v2", {})
       const data = await client.query(Prismic.Predicates.at('document.type', productId))

       return { props: {
               product:JSON.parse(JSON.stringify(product)),
               data: data
       }};
}

