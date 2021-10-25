import React, {useState} from 'react';
import MainContainer from "../components/MainContainer";
import Link from "next/link"
import {client} from "../utils/shopify"
import Card from "../components/Card"
import ProductPopup from "../components/ProductPopup"
import { toJS } from 'mobx';
import products_store from "../store/products_store";
import { FaRegSquare,FaRegCheckSquare } from "react-icons/fa";

export default function products({products}) {
const quantity_products = 6;
const [product, setProduct] = useState('')
const [popup, setPopup] = useState(false);
const [page, setPage] = useState(products);
const [pagination, setPagination] = useState(createPagination(quantity_products));
const [allProducts, setAllProducts] = useState(()=>products);
const [filteredProducts, setFilteredProducts] = useState(()=>products);
const [filter, setFilter] = useState(createFilter());
const [currentFilter, setCurrentFilter] = useState([]);
const [currentProducts, setCurrentProducts] = useState(set_current_products());

function set_current_products(){
return(
filteredProducts.slice(0, quantity_products)
)

}

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
               let options = allProducts[product].options[option]
                if( !pageFilter.find((e)=>e.name == options.name )){
                  let options_values = []
                  options.values.map((option) => options_values.push(option.value))
                  pageFilter.push({name: options.name, values: options_values });
                }
                else{
                 let current_option = pageFilter.find((e)=>e.name == options.name)
                  let new_options_values = []
                  options.values.map((option) => new_options_values.push(option.value))
                  current_option.values=[...new Set([...current_option.values,...new_options_values])]
                  current_option.values.sort()
                }
             }
        }
    return pageFilter
}

  function set_current_filter(value){
  let current_filter = [...currentFilter]
  current_filter.push(value)
  let new_current_filter = current_filter
  setCurrentFilter(new_current_filter)
  console.log(currentFilter)
  let newFilteredProducts = [];
  allProducts.map((product)=>{
   product.options.map((option) => {
      option.values.map((value) => {
       if(new_current_filter.includes(value.value)){
         newFilteredProducts.push(product)
        }
       })
   })
  })

setFilteredProducts(newFilteredProducts)
setCurrentProducts(newFilteredProducts)
  }

console.log(filteredProducts)
    return (
    <MainContainer title={'product'}>
      <div className="container-fluid products_top_section">
      <p>collection</p>
      <h1>All Products</h1>
        </div>
            <div className="container products">
            { popup == true ?  <div className="popup active" onClick={()=>{setPopup(false)}}><ProductPopup product={product}/></div> : <div className="popup"></div> }
          <div className="row">
               <div className="col-md-2">

                 {filter.map((option) => {
                  return(
                     <ul className="products_filter"><h5>{option.name}</h5>
                       {option.values.map((value) => {
                         return (

                         <li
                         onClick={() => set_current_filter(value)}
                         className ={currentFilter.some(e => (e == value)) == true  ? 'active' : '' }
                         >
                         <FaRegSquare className="check_box"/>
                         <FaRegCheckSquare className="check_box_active"/>
                          {value}</li>
                         )
                       })}
                     </ul>
                     )
                 })}
               </div>
               <div className="col-md-10">
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
              </div>
            </div>
             <div className="row products_pagination">
                            <ul>
                          {pagination.map((index)=>{
                          return(
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
