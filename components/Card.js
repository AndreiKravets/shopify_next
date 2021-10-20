import React from 'react'
import { FaRegEye, FaRegHeart, FaCartArrowDown } from 'react-icons/fa'
import Link from "next/link"
import {client} from "../utils/shopify";

export default function Card (props) {
    const {index, id, title,images,price} = props;
    const style ={
        backgroundImage: `url(${images})`
    }


    return(
        <div className="card_product_col" key={index}>
                <div className="card_product" style={style}>
                    <div className="card_product_inner">
                        <FaRegHeart/>
                        <FaRegEye/>
                    </div>
                </div>
                       <div onClick={e => e.stopPropagation()}>
                            <Link href={`/product/${id}`}>{title}</Link>
                            <Link href={`/product/${id}`}><strong>{price} $</strong></Link>
                        </div>
        </div>
    )
}