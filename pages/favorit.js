import React, {useState, useEffect} from 'react';
import MainContainer from "../components/MainContainer";
import Link from "next/link"
import {shopifyClient} from "../utils/shopify"
import Card from "../components/Card"
import ProductPopup from "../components/ProductPopup"
import {toJS} from 'mobx';
import products_store from "../store/products_store";
import {FaRegSquare, FaRegCheckSquare} from "react-icons/fa";
import { AiOutlineCloseSquare } from "react-icons/ai";
import {motion} from "framer-motion";


const Favorits = ({products}) => {
    const quantity_products = 6;
    const [product, setProduct] = useState('')
    const [popup, setPopup] = useState(false);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState(set_current_products());
    const [pagination, setPagination] = useState(createPagination(quantity_products, filteredProducts));

    const [favorit_product, setFavoritPproduct] = useState(' ')
    const [loaded, setLoaded] = useState(true)

    useEffect(() => {

        function favoritProductInit() {
            if(localStorage.getItem("favorit_product")){
                    let tempFavoritProduct = (JSON.parse(JSON.stringify(localStorage.getItem("favorit_product"))).split(','));
                    const filteredFavoritProduct = products.filter( product =>tempFavoritProduct.includes(product.id))
                setFilteredProducts(filteredFavoritProduct)
               // setCurrentProducts(filteredFavoritProduct.slice(0,quantity_products))
                setCurrentProducts(filteredFavoritProduct)
                setPagination(createPagination(quantity_products, filteredProducts))
                setFavoritPproduct(JSON.parse(JSON.stringify(localStorage.getItem("favorit_product"))).split(','))
            }
            else{
                localStorage.setItem('favorit_product', " ");
            }

        }
        if (loaded){
            setLoaded(false)
            favoritProductInit()
        }
    }, []);
     console.log(filteredProducts)
    function setFavoritProduct(id){
        const storage = window.localStorage;
        let tempFavoritProduct = (JSON.parse(JSON.stringify(localStorage.getItem("favorit_product"))).split(','));
        if(tempFavoritProduct[0] == " "){ tempFavoritProduct = []}

        if (tempFavoritProduct.includes(id)){
            tempFavoritProduct = tempFavoritProduct.filter((item) => item !== id)
            storage.setItem('favorit_product', tempFavoritProduct)
            setFavoritPproduct(tempFavoritProduct)
        }
        else {
            tempFavoritProduct.push(id)
            console.log(tempFavoritProduct)
            tempFavoritProduct.join(',')
            storage.setItem('favorit_product', tempFavoritProduct)
            setFavoritPproduct(tempFavoritProduct)
        }
    }



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

    function createPagination(page, filteredProducts) {
        let pageArr = [];
        for (var i = 1; i < filteredProducts.length / page + 1; i++) {
            pageArr.push(i);
        }
        return pageArr
        setPagination(pageArr)
    }


    return (
        <>
            {popup == true ? <div className="popup active" onClick={() => {
                setPopup(false)
            }}>
                <div onClick={() => {setPopup(false)}}  className="product_popup_close"><AiOutlineCloseSquare/></div>
                <ProductPopup product={product}/>
            </div> : <div className="popup"></div>}
            <MainContainer title={'product'}>
                <div className="container-fluid products_top_section">
                    <div>
                        <p>collection</p>
                        <h1>Favorit Products</h1>
                    </div>
                </div>
                <div className="container products">
                            <motion.div initial="initial" animate="enter" exit="exit" variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
                                <div className="row">
                                    {currentProducts.map((product, index) => {

                                        return (
                                            <motion.div className="col-md-4" onClick={() => getProduct(product)} initial="hidden" whileInView="visible" key={product.id} variants={{
                                                hidden: {
                                                    scale: .8,
                                                    opacity: 0,
                                                    y: -100
                                                },
                                                visible: {
                                                    scale: 1,
                                                    y: 0,
                                                    opacity: 1,
                                                    transition: {
                                                        delay: 0.05,
                                                        duration: .2, ease: [0.48, 0.15, 0.25, 0.96]
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
                                                    setFavoritProduct={setFavoritProduct}
                                                    favorit_product={favorit_product}
                                                />
                                            </motion.div>
                                        )
                                    })
                                    }
                                </div>
                            </motion.div>

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
        </>
    )
}

export default Favorits

export async function getServerSideProps() {
    const products = await shopifyClient.product.fetchAll()
    return {props: {products: JSON.parse(JSON.stringify(products))}}
}
