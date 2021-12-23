import React, {useState, useEffect} from 'react';
import { FaRegEye, FaRegHeart, FaCartArrowDown } from 'react-icons/fa'
import Link from "next/link"
import Image from 'next/image'


export default function Card ({index, id, handle, title,images,price}) {

    const [loaded, setLoaded] = useState(true)
    const [favorit_icon, setFavoritIicon] = useState([])
    const [favorit_product, setFavoritPproduct] = useState(false)

    useEffect(() => {

        function favoritProductInit() {
            setFavoritIicon(localStorage.getItem("favorit_product"))
            if (id == (localStorage.getItem("favorit_product"))){
                setFavoritPproduct(false)
                setFavoritPproduct(true)
            }
            else  setFavoritPproduct(false)
        }

        if (loaded){
            favoritProductInit()
            setLoaded(false)
        }
    }, []);

    function set_favorit_product(product_id) {
        localStorage.setItem('favorit_product', product_id);
        if (product_id == (localStorage.getItem("favorit_product"))){
            setFavoritPproduct(false)
        }
        else  setFavoritPproduct(true)
    }

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
                        layout='fill'
                        objectFit='cover'
                        objectPosition='center'
                    />
                    <div className="card_product_inner">
                        <FaRegHeart onClick={e => {
                            e.stopPropagation()
                            set_favorit_product(id)
                        }}/>
                        <FaRegEye/>
                    </div>
                    {favorit_product == true ? <FaRegHeart onClick={e => {
                        e.stopPropagation()
                        set_favorit_product(id)
                    }
                    } className="favorit_icon"/> : " "}
                </div>
                       <div onClick={e => e.stopPropagation()}>
                                   <Link href={`/product/${handle}`}>{title}</Link>
                           <Link href={`/product/${handle}`}><a className='card_price'>FROM ${`${price} `}</a></Link>
                        </div>
        </div>
    )
}