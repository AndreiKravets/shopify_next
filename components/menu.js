import React from 'react'
import Link from "next/link"
import Router from 'next/router'
import {FaRegHeart} from "react-icons/fa";

const Menu = ()=>  {
        return (
            <ul>
                <li>
                    <Link href="/"><a>Home</a></Link>
                </li>
                <li>
                    <Link href="/about"><a>About</a></Link>
                </li>
                <li className="menu_item_has_children">
                    <Link href="/products"><a>Products</a></Link>
                </li>
                <li className="menu_item_has_children">
                    <Link href="/collections"><a>Collections</a></Link>
                </li>
            </ul>
        )
}

export default Menu