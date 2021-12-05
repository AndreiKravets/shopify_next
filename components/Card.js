import React from 'react'
import { FaRegEye, FaRegHeart, FaCartArrowDown } from 'react-icons/fa'
import Link from "next/link"
import Image from 'next/image'


export default function Card (props) {
    const {index, id,handle, title,images,price} = props;
    const style ={
        backgroundImage: `url(${images})`
    }
    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    return(
        <div className="card_product_col" key={index}>
                <div className="card_product">
                    <Image
                        className="card_product_bg"
                        loader={myLoader}
                        src={images}
                        alt={title}
                        width={500}
                        height={500}
                        layout='fill'
                        objectFit='cover'
                        objectPosition='center'
                    />
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