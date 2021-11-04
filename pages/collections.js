import React, {useState} from 'react';
import MainContainer from "../components/MainContainer";
import Link from "next/link"
import {client} from "../utils/shopify"
import Card from "../components/Card"
import ProductPopup from "../components/ProductPopup"
import { toJS } from 'mobx';
import products_store from "../store/products_store";


export default function collections({products}) {
    const quantity_products = 6;
    const [product, setProduct] = useState('')
    const [popup, setPopup] = useState(false);
    const [page, setPage] = useState(products);
    const [pagination, setPagination] = useState(createPagination(quantity_products));
    const [allProducts, setAllProducts] = useState(()=>products);
    const [currentProducts, setCurrentProducts] = useState(()=>products.slice(0, quantity_products));

    async function getProduct(id){
        const product = await client.product.fetch(id);
        const productPopup = JSON.parse(JSON.stringify(product));
        setProduct(productPopup)
        setPopup(true)
    }

    async function getCollection(){
        const collections = await client.collection.fetchAllWithProducts()
        //return JSON.parse(JSON.stringify(collections));
        console.log(JSON.parse(JSON.stringify(collections)))
    }
    getCollection()
    function current_Products(current_page){
        setCurrentProducts(allProducts.slice(current_page*quantity_products-quantity_products, current_page*quantity_products))
    }

    function createPagination(page){
        let pageArr = [];
        for (var i = 1; i < products.length/page+1; i++) {
            pageArr.push(i);
        }
        return pageArr
    }


    return (
        <MainContainer title={'product'}>
            <div className="container-fluid products_top_section">
                <p>collection</p>
                <h1>All Collection</h1>
            </div>
            <div className="container products">
                { popup == true ?  <div className="popup active" onClick={()=>{setPopup(false)}}><ProductPopup product={product}/></div> : <div className="popup"></div> }

                <div className="row">
                    {currentProducts.map((product, index) => {
                        return (
                            <div className="col-md-4" key={index}>
                                <Link href={`/collections/${index}`}>{product.handle}</Link>
                            </div>
                        )
                    })
                    }
                </div>
                <div className="row products_pagination">
                    <ul>
                        {pagination.map((index)=>{
                            return(
                                <li onClick={()=>current_Products(index)} key={index}>{index}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>

        </MainContainer>
    )
}


export async function getServerSideProps() {
    const collections = await client.collection.fetchAllWithProducts()
    return {props: {products: JSON.parse(JSON.stringify(collections))}}
}
