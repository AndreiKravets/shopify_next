import React, {Component} from 'react';
import {shopifyClient} from "../../../utils/shopify"
import { useState, useEffect } from "react";
import MainContainer from "../../../components/MainContainer";
import cart_store from "../../../store/cart_store";
import {observer} from "mobx-react-lite";
import Prismic from "@prismicio/client";
import Image from "next/image";
import { AiOutlineCloseSquare } from "react-icons/ai";
import {FaRegHeart} from "react-icons/fa";
import Slider from "react-slick";

const Product = observer( ({product, data})=> {
    console.log('sdfdf', product)
    let productData = false
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
    const [temp_price, setTempPrice] = useState(() => price)
    const [variants, setVariants] = useState(() => product.variants[0])
    const [quantity, setQuantity] = useState(1)
    const [popup, setPopup] = useState(false);
    const [favorit_product, setFavoritPproduct] = useState(' ')
    const [loaded, setLoaded] = useState(true)

    useEffect(() => {

        function favoritProductInit() {
            if(localStorage.getItem("favorit_product")){
                setFavoritPproduct(JSON.parse(JSON.stringify(localStorage.getItem("favorit_product"))).split(','))
            }
            else{
                localStorage.setItem('favorit_product', " ");
            }

        }
        if (loaded){
            setLoaded(false)
            favoritProductInit()
        }
    }, []);

    function setFavoritProduct(id){
        const storage = window.localStorage;
        let tempFavoritProduct = (JSON.parse(JSON.stringify(localStorage.getItem("favorit_product"))).split(','));
        if(tempFavoritProduct[0] == " "){ tempFavoritProduct = []}

        if (tempFavoritProduct.includes(id)){
            tempFavoritProduct = tempFavoritProduct.filter((item) => item !== id)
            storage.setItem('favorit_product', tempFavoritProduct)
            setFavoritPproduct(tempFavoritProduct)
        }
        else {
            tempFavoritProduct.push(id)
            console.log(tempFavoritProduct)
            tempFavoritProduct.join(',')
            storage.setItem('favorit_product', tempFavoritProduct)
            setFavoritPproduct(tempFavoritProduct)
        }
    }



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
                        setPrice(variants[key].price)
                        setTempPrice(((quantity)*variants[key].price).toFixed(2))
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
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return(
        <>
            {popup == true ?
                <div className="product_popup popup active" onClick={() => {setPopup(false)}}>
                    <div onClick={() => { setPopup(false)}} className="product_popup_close"><AiOutlineCloseSquare/></div>
                    {product.images.map((image, index) => {
                        return (
                            <Image
                                key={index}
                                onClick={e => e.stopPropagation()}
                                loader={myLoader}
                                src={image.src}
                                alt={image.src}
                                width={500}
                                height={500}
                            />
                        )
                    })}
                </div> :
                <MainContainer>
                    <div className="container single_product_container">
                        <div className="row">
                            <div className="col-md-6 single_product_image" onClick={() => setPopup(true)}>
                                <div className="single_product_image_sm">
                                    <h1 className="product_title">{product.title}</h1>
                                    <Slider {...settings}>
                                        {product.images.map((image, index) => {
                                            return (
                                                <Image
                                                    key={index}
                                                    loader={myLoader}
                                                    src={image.src}
                                                    alt={image.src}
                                                    width={500}
                                                    height={500}
                                                />
                                            )
                                        })}
                                    </Slider>
                                </div>
                                <div className="single_product_image_lg">
                                    {product.images.map((image, index) => {
                                        return (
                                            (index == 0 || (index == product.images.length - 1 || (product.images.length - 1 % 2 === 0)) ?
                                                    <div className="width_100">
                                                        <Image
                                                            loader={myLoader}
                                                            src={image.src} key={index}
                                                            alt={image.src}
                                                            width={500}
                                                            height={500}
                                                        />
                                                    </div>
                                                    :
                                                    <div className="width_50">
                                                        <Image
                                                            loader={myLoader}
                                                            src={image.src} key={index}
                                                            alt={image.src}
                                                            width={500}
                                                            height={500}
                                                        />
                                                    </div>
                                            )
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="single_product_content">
                                    <h4 className="product_title">{product.title}</h4>
                                    <h5 className="product_price">$ {temp_price}</h5>
                                    <div className="product_options_parent">
                                        {product.options.map((option, index) => {
                                            return (
                                                <div className="product_options" key={index}>
                                                    <div><span>{option.name}</span></div>
                                                    <ul id={option.name}>
                                                        {option.values.map((val, index) => {
                                                            if (index == 0) {
                                                                return (
                                                                    <li
                                                                        key={index}
                                                                        className="active btn"
                                                                        onClick={(e) => {
                                                                            onVar(e, option.name, val.value, product.variants)
                                                                        }}>
                                                                        {val.value}
                                                                    </li>
                                                                )
                                                            } else {
                                                                return (
                                                                    <li key={index}
                                                                        className='btn'
                                                                        onClick={(e) => {
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
                                        <div><span>Quantity</span></div>
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
                                    <div className="single_product_btn">
                                        <button className="btn_add_to_cart" onClick={addToCart}>Add to cart</button>
                                        <button className="btn_favorites" onClick={e => {setFavoritProduct(product.id)}}>
                                            {favorit_product.includes(product.id) ? <FaRegHeart/> : " "}
                                            Favorites</button>
                                    </div>

                                    <div>
                                        <h6>Description & Details</h6>
                                        <p>{product.description}</p>
                                    </div>
                                    <div>
                                        {productData == false ? '' :
                                            <h6 style={{color: `${productData.color}`}}>{productData.title[0].text}</h6>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainContainer>
            }
        </>
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