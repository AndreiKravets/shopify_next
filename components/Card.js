import React, {useState, useEffect} from 'react';
import {FaRegEye, FaRegHeart, FaCartArrowDown} from 'react-icons/fa'
import Link from "next/link"
import Image from 'next/image'
import { useKlaviyo } from '@frontend-sdk/klaviyo'
import { identifyUser, trackVisitedProduct, trackAddedToCart } from '@frontend-sdk/klaviyo'



export default function Card({index, id, route, handle, title, images, price, setFavoritProduct, favorit_product}) {
    const style = {
        backgroundImage: `url(${images})`
    }
    const myLoader = ({src, width, quality}) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    return (
        <div className="card_product_col" key={index}>
            <div className="card_product">
                <Image
                    className="card_product_bg"
                    loader={myLoader}
                    src={images}
                    alt={title}
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                />
                <div className="card_product_inner">
                    {favorit_product.includes(id) ? <FaRegHeart className="favorit_icon_none"/> :
                        <FaRegHeart onClick={e => {
                            e.stopPropagation()
                            setFavoritProduct(id)
                        }}/>}
                    <FaRegEye/>
                </div>
                {favorit_product.includes(id) ? <FaRegHeart onClick={e => {
                    e.stopPropagation()
                    setFavoritProduct(id)
                }
                } className="favorit_icon"/> : " "}
            </div>
            <div onClick={e => e.stopPropagation()} className="card_link_block">
                <Link href={`${route}/${handle}`} onClick={() => trackVisitedProduct(product)}>{title}</Link>
                <Link href={`${route}/${handle}`} onClick={() => trackVisitedProduct(product)}><a className='card_price'>FROM ${`${price} `}</a></Link>
            </div>
        </div>
    )
}