import React, {useState} from 'react';
import MainContainer from "../components/MainContainer";
import Link from "next/link"
import {client} from "../utils/shopify"
import Card from "../components/Card"
import ProductPopup from "../components/ProductPopup"
import { toJS } from 'mobx';
import products_store from "../store/products_store";


export default function products({products}) {
const quantity_products = 6;
const [product, setProduct] = useState('')
const [popup, setPopup] = useState(false);
const [page, setPage] = useState(products);
const [pagination, setPagination] = useState(createPagination(quantity_products));
const [allProducts, setAllProducts] = useState(()=>products);
const [filter, setFilter] = useState(createFilter());
const [currentProducts, setCurrentProducts] = useState(()=>products.slice(0, quantity_products));
console.log(allProducts)
async function getProduct(id){
    const product = await client.product.fetch(id);
     const productPopup = JSON.parse(JSON.stringify(product));
     setProduct(productPopup)
     setPopup(true)
    }

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


function createFilter(){
  let pageFilter = [];
  for (let product = 0; product < allProducts.length; product++) {
          for (let option = 0; option < allProducts[product].options.length; option++) {
          pageFilter.push({name:'name', value: allProducts[product].options[option].name});
                         for (let val = 0; val < allProducts[product].options[option].values.length; val++) {
                          pageFilter.push({name:'value', value: allProducts[product].options[option].values[val].value});
                    }
             }
        }
        console.log(pageFilter)
    return pageFilter
}

    return (
    <MainContainer title={'product'}>
      <div className="container-fluid products_top_section">
      <p>collection</p>
      <h1>All Products</h1>
       </div>
            <div className="container products">
            { popup == true ?  <div className="popup active" onClick={()=>{setPopup(false)}}><ProductPopup product={product}/></div> : <div className="popup"></div> }

             {filter.map((value, index) => {return value.value})}

                <div className="row">
                    {currentProducts.map((product, index) => {
                        return (
                      <div className="col-md-4"
                      onClick={() => getProduct(product.id)
                              }>
                                <Card
                                  images =  {product.images[0].src}
                                  index = {index}
                                  id = {product.id}
                                  title = {product.title}
                                  description = {product.description}
                                  price = {product.variants[0].price}
                                />
                                </div>
                        )
                    })
                    }
                </div>
                <div className="row products_pagination">
                <ul>
              {pagination.map((index)=>{
              return(
                //  <link href={`/products/${index}`}>{index}</link>
                <li onClick={()=>current_Products(index)}>{index}</li>
              )
              })}
              </ul>
              </div>
            </div>

        </MainContainer>
    )
}


export async function getServerSideProps() {
    const products = await client.product.fetchAll()
    return {props: {products: JSON.parse(JSON.stringify(products))}}
}
