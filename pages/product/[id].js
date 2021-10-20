import React, {Component} from 'react';
import {client} from "../../utils/shopify"
import Router , {useRouter}  from 'next/router';
import { useState } from "react";
import {unshiftLoader} from "next/dist/build/webpack/config/helpers";
import MainContainer from "../../components/MainContainer";
import image from "next/image";

export default class Post extends Component {

    state = {
        options: [
            {name : 'name', value: 'value'},
            {name : 'name', value: 'value'}
        ],
        price: 0,
        variants: {},
        id:"",
        quantity: 1
    }
    componentDidMount() {
        const { product } = this.props;
        const options = []
        product.options.map((option) => {
            const name = option.name
            const value = option.values[0].value
            const firstOptions = { name, value}
            options.push(firstOptions)
            this.setState({
                options: options
            })
        })

        this.setState({
            price: product.variants[0].price,
            variants: product.variants[0]
        })

    }




    onVar (e, name, value, variants) {
        var x = document.getElementById(name).querySelectorAll(".active");
        x[0].classList.remove('active');
        e.target.className = "active";
        const options_click = this.state.options
        for (var key in options_click) {
            if (options_click[key].name == name){
                options_click[key].value = value
            }
        }
        this.setState({
            options: options_click
        })


        let count = 0

        for (var key in variants) {
            for (var index in variants[key].selectedOptions) {
                if (variants[key].selectedOptions[index].name == this.state.options[index].name && variants[key].selectedOptions[index].value == this.state.options[index].value)
                {
                    count += 1
                    if (count == this.state.options.length) {
                        console.log(variants[key])
                        this.setState({
                            price: variants[key].price,
                            variants: variants[key]

                        })
                        return false
                    }
                    continue
                }
                else{
                    count=0
                }
            }
        }
        this.setState({
            variants: variants
        })


    }
    render() {
        const { product } = this.props;
        const  {options} = this.state;
        const  {price} = this.state;
        const  {variants} = this.state;
        const  {quantity} = this.state;





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
                variantId: this.state.variants.id,
                quantity: quantity
            }])
            storage.setItem('cart', JSON.stringify(cart))
            console.log(cart)
            // Router.push(cart.webUrl)
        };


        const checkout = async () => {
            const storage = window.localStorage;
            let checkoutId = storage.getItem("checkoutId");
            console.log(checkoutId);
            if (!checkoutId) {
                const checkout = await client.checkout.create();
                checkoutId = checkout.id;
                storage.setItem('checkoutId', checkoutId);
            }
            const cart = await client.checkout.addLineItems(checkoutId, [{
                variantId: this.state.variants.id,
                quantity: quantity
            }])
            storage.setItem('cart', JSON.stringify(cart))
            console.log(cart)
            Router.push(cart.webUrl)
        };


        return (
            <MainContainer title={product.title}>
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
                        <p>{product.title}</p>
                        <p>{product.description}</p>
                        <div className="d-flex">
                            {product.options.map((option, index) => {
                                return (
                                    <div className="pruduct_options" key={index}>
                                        <div><h3>{option.name}</h3></div>
                                        <ul className="myDIV"  id={option.name}>
                                            { option.values.map((val, index) => {
                                                if (index == 0) {
                                                    return (

                                                        <li
                                                            key={index}
                                                            className= "active btn"
                                                            onClick = {(e) => {
                                                                this.onVar(e, option.name, val.value, product.variants)
                                                            }}
                                                        >
                                                            {val.value}
                                                        </li>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <li key={index}
                                                            className= 'btn'
                                                            onClick = {(e) => {
                                                                this.onVar(e, option.name, val.value, product.variants)
                                                            }}
                                                        >
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
                        <h1>{price}</h1>
                        <h1>{options[0].value} - {options[1].value}</h1>
                        <batton color='purple' onClick={addToCart}>Add to cart</batton>
                        <input
                            action={{
                                color: 'teal',
                                labelPosition: 'left',
                                icon: 'cart',
                                onClick: checkout,
                                content: 'Checkout',
                            }}
                            onChange={(e, {value}) =>
                                this.setState({
                                    quantity: Number(value)
                                })}
                            type="number"
                            actionPosition='left'
                            placeholder='Search...'
                            defaultValue='1'
                        />
                    </div>
                </div>
            </div>
            </MainContainer>
        )
    }
}

export async function getServerSideProps({ query }) {
    const productId = query.id;
    const product = await client.product.fetch(productId);
    return { props: { product: JSON.parse(JSON.stringify(product)) }};
}


