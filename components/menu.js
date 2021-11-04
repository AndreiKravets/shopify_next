import React from 'react'
import Link from "next/link"
import {client} from "../utils/shopify";
import { toJS } from 'mobx';
import products_store from "../store/products_store";
import {observer} from "mobx-react-lite";

const Menu = observer(()=>  {
    products_store.getAllCollections()
const allMenuCollections = toJS(products_store.allCollections);
    if(allMenuCollections == 1){
        return (
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>

            </ul>
        )
    }
    else {
        return (
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li className="menu_item_has_children">
                    <Link href="/products">Products</Link>
                </li>
                <li className="menu_item_has_children">
                    <Link href="/collections">Collections</Link>
                    <ul className="sub-menu">
                        {allMenuCollections.map((collection,index)=>{
                            return(
                                <li key={index}><Link href={`/collections/${index}`}>{collection.handle}</Link></li>
                            )
                        })}

                    </ul>
                </li>
            </ul>
        )
    }
})

export default Menu


export async function getServerSideProps() {
    const collections = await client.collection.fetchAllWithProducts()
    return {props: {products: JSON.parse(JSON.stringify(collections))}}
}