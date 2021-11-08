import React from 'react'
import Link from "next/link"
import {client} from "../utils/shopify";
import { toJS } from 'mobx';
import products_store from "../store/products_store";
import {observer} from "mobx-react-lite";

const Menu = observer(()=>  {
        return (
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
                <li className="menu_item_has_children">
                    <Link href="/products">Products</Link>
                </li>
                <li className="menu_item_has_children">
                    <Link href="/collections">Collections</Link>
                </li>
            </ul>
        )
})

export default Menu