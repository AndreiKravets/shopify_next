import React, {useState} from 'react';
import MainContainer from "../components/MainContainer";
import Link from "next/link"
import {shopifyClient} from "../utils/shopify"
import Card from "../components/Card"
import ProductPopup from "../components/ProductPopup"
import {toJS} from 'mobx';
import products_store from "../store/products_store";
import {FaRegSquare, FaRegCheckSquare} from "react-icons/fa";
import {motion} from "framer-motion";


const Products = ({products}) => {
    const quantity_products = 6;
    const [product, setProduct] = useState('')
    const [popup, setPopup] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(() => products);
    const [pagination, setPagination] = useState(createPagination(quantity_products,filteredProducts));
    const [filter, setFilter] = useState(createFilter());
    const [currentFilter, setCurrentFilter] = useState([[]]);
    const [currentProducts, setCurrentProducts] = useState(set_current_products());

    function set_current_products() {
        return (
            filteredProducts.slice(0, quantity_products)
        )
    }

    async function getProduct(product) {
        setProduct(product)
        setPopup(true)
    }

    function current_Products(current_page) {
        setCurrentProducts(filteredProducts.slice(current_page * quantity_products - quantity_products, current_page * quantity_products))
    }

    function createPagination(page, products) {
        let pageArr = [];
        for (var i = 1; i < products.length / page + 1; i++) {
            pageArr.push(i);
        }
        return pageArr
        setPagination(pageArr)
    }


    function createFilter() {
        let pageFilter = [];
        for (let product = 0; product < products.length; product++) {
            for (let option = 0; option < products[product].options.length; option++) {
                let options = products[product].options[option]
                if (!pageFilter.find((e) => e.name == options.name)) {
                    let options_values = []
                    options.values.map((option) => options_values.push(option.value))
                    pageFilter.push({name: options.name, values: options_values});
                } else {
                    let current_option = pageFilter.find((e) => e.name == options.name)
                    let new_options_values = []
                    options.values.map((option) => new_options_values.push(option.value))
                    current_option.values = [...new Set([...current_option.values, ...new_options_values])]
                    current_option.values.sort()
                }
            }
        }
        return pageFilter
    }

    function set_current_filter(name, value) {
        let current_filter = [...currentFilter]



        let option = current_filter.find(e => e.name == name)
        if (option) {
         if(option.values.includes(value)){
            option.values = option.values.filter(item => item !== value)
           current_filter[0].splice(current_filter[0].indexOf(value), 1);

            if(option.values.length < 1){
            const index = current_filter.map(e => e.name).indexOf(name);
          current_filter.splice(index, 1);
           }
          } else{
           option.values.push(value)
           current_filter[0].push(value)
          }
          } else{
            current_filter.push({name:name, values:[value]})
            current_filter[0].push(value)
        }
        setCurrentFilter(current_filter)
        console.log(current_filter)


        let newFilteredProducts = [];
        products.map((product) => {
            if (product.options.length >= current_filter.length - 1) {
                let coincidence = 0;
                for (let option = 0; option < product.options.length; option++) {
                    for (let filter = 1; filter < current_filter.length; filter++) {
                        if (current_filter[filter].name == product.options[option].name) {
                            for (let val = 0; val < product.options[option].values.length; val++) {
                                if (current_filter[filter].values.includes(product.options[option].values[val].value) == true) {
                                    coincidence += 1
                                    break
                                }
                            }
                        }
                    }
                 }
                    if (coincidence == current_filter.length - 1) {
                        newFilteredProducts.push(product)
                    }
            }
        })

     setFilteredProducts(newFilteredProducts)
     current_Products(1)
     setCurrentProducts(newFilteredProducts.slice(0, quantity_products))
     setPagination(createPagination(quantity_products,newFilteredProducts))
    }

   function clearFilter() {
   setCurrentFilter([[]])
      setFilteredProducts(products)
        current_Products(1)
        setCurrentProducts(products.slice(0, quantity_products))
        setPagination(createPagination(quantity_products,products))
    }
    return (
        <MainContainer title={'product'}>
            <div className="container-fluid products_top_section">
                <p>collection</p>
                <h1>All Products</h1>
            </div>
            <div className="container products">
                {popup == true ? <div className="popup active" onClick={() => {
                    setPopup(false)
                }}><ProductPopup product={product}/></div> : <div className="popup"></div>}
                <div className="row">
                    <div className="col-md-2">

                        {filter.map((option, index) => {
                            return (
                                <ul className="products_filter" key={index}><h5>{option.name}</h5>
                                    {option.values.map((value, index) => {
                                        return (

                                            <li
                                                key={index}
                                                onClick={() => set_current_filter(option.name, value)}
                                                className={currentFilter[0].some(e => (e == value)) == true ? 'active' : ''}
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
                                    <div className="col-12 btn_clear_filter">
                                    <button onClick={clearFilter}>Clear Filter</button>
                                    </div>
                                    </div>
                                <motion.div initial="initial" animate="enter" exit="exit" variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
                        <div className="row">
                            {currentProducts.map((product, index) => {

                                return (
                                    <div className="col-md-4"
                                         onClick={() => getProduct(product)}
                                         key={index}>
                                            <motion.div initial="hidden" animate="visible" key={product.id} variants={{
                                                         hidden: {
                                                             scale: .8,
                                                             opacity: 0
                                                         },
                                                         visible: {
                                                             scale: 1,
                                                             opacity: 1,
                                                             transition: {
                                                                 delay: .1
                                                             }
                                                         }
                                                     }}>
                                        <Card
                                            images={product.images[0].src}
                                            index={index}
                                            id={product.id}
                                            handle={product.handle}
                                            title={product.title}
                                            description={product.description}
                                            price={product.variants[0].price}
                                        />
                                       </motion.div>
                                    </div>
                                )
                            })
                            }
                        </div>
                         </motion.div>
                    </div>
                </div>
               {pagination.length > 1 ?  <div className="row products_pagination">
                                 <ul>
                                     {pagination.map((index) => {
                                         return (
                                             <li key={index} onClick={() => current_Products(index)}>{index}</li>
                                         )
                                     })}
                                 </ul>
                             </div> : <div></div>}
            </div>

        </MainContainer>
    )
}

export default Products

export async function getServerSideProps() {
    const products = await shopifyClient.product.fetchAll()
    return {props: {products: JSON.parse(JSON.stringify(products))}}
}
