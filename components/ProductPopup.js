import React, {useState} from 'react'
import {client} from "../utils/shopify";

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
                        <h3>{price}</h3>
                        <batton>Add to cart</batton>
                    </div>
                </div>
            </div>
        </div>
    )
}