import React from 'react'
import { FaRegEye, FaRegHeart, FaCartArrowDown } from 'react-icons/fa'
import Link from "next/link"

export default function Card (props) {
    const {index, id,handle, title,images,price} = props;
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
                            <Link href={`/product/${handle}`}>{title}</Link>
                            <Link href={`/product/${handle}`}><strong>{price} $</strong></Link>
                        </div>
        </div>
    )
}