import React, {useState, useEffect} from 'react';
import MainContainer from "../components/MainContainer";
import {shopifyClient} from "../utils/shopify";
import ProductPopup from "../components/ProductPopup"
import Prismic from "@prismicio/client";
import {RichText} from 'prismic-reactjs';
import Slider from "react-slick";
import Link from "next/link";
import Card from "../components/Card";
import {motion} from "framer-motion";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import InstagramEmbed from 'react-instagram-embed';



export default function Home({collections,homepage,slider,isVisible}) {
    homepage = homepage.results[0].data
    slider = slider.results
    const home_collections = collections.filter(collection => collection.handle == 'chain' || collection.handle == 'combos' || collection.handle == 'bracelets')
    const all_products = collections.filter(collection => collection.handle == 'all-products')
    const home_all_products = all_products[0].products.slice(0,8)
    const under_products = collections.filter(collection => collection.handle == 'under-200')
    const home_under_products = under_products[0].products.slice(0,4)
    const [product, setProduct] = useState('')
    const [popup, setPopup] = useState(false)
    const [favorit_product, setFavoritPproduct] = useState(' ')
    const [loaded, setLoaded] = useState(true)

    useEffect(() => {

        function favoritProductInit() {
            if(localStorage.getItem("favorit_product")){
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




        const settings = {
            dots: false,
            arrows: false,
            infinite: true,
            speed: 500,
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1
        }
console.log(homepage)

    async function getProduct(product) {
        setProduct(product)
        setPopup(true)
    }



  return (
    <MainContainer>
        {popup == true ? <div className="popup active" onClick={() => {
            setPopup(false)
        }}><ProductPopup product={product}/></div> : <div className="popup"></div>}
        <div className="container-fluid home_top_section">

                <Slider {...settings}>
            {slider.map((slide,index) => {
                return(
                    <div className="container" key={index}>
                     <div className="row">
                        <div className="col-md-4">
                            <h1>{slide.data.title[0].text}</h1>
                            {slide.data.subtitle.map((paragraph, index) => {
                                return (
                                paragraph.text
                                )
                            })}
                        </div>
                        <div className="col-md-8"style={{backgroundImage: `url(${slide.data.big_image.url})`}}>
                            <img src={slide.data.small_image.url} />
                        </div>
                     </div>
                    </div>
                )


            })}
                </Slider>

        </div>
        <div className="container home_collections_section">
              <img src="bg_legendary.jpg" alt="bg_legendary" className="home_bg_legendary"/>
            <div className="row">
            {home_collections.map((product, index) => {
              return (
                <div className="col-md-4" key={index}>
                    <div className="home_collections_section_inner" style={{backgroundImage: `url(${product.image.src})`}}>
                        <Link href={`/collections/${product.handle}`}>{product.title}</Link>
                        <div className="d-flex">
                            <h6>Look More</h6>
                            <BiRightArrowAlt/>
                        </div>

                    </div>
                </div>
              )
             })
            }
            </div>
            <div className='row home_collections_legendary'>
                <div className="col-md-2"></div>
                <div className="col-md-5 home_legendary_text">{homepage.legendary_text[0].text}</div>
                <div className="col-md-5 home_legendary_image"><img src={homepage.legendary_image.url} alt=""/></div>
            </div>
        </div>
        <div className="container home_product_container">
            <div className="home_product_title">
                <div>
                    <h6>Upgrade your fit</h6>
                    <h2>Best Sellers</h2>
                </div>
                <Link href={`/collections/${all_products[0].handle}`}>View All</Link>
            </div>
            <div className="row">
                {home_all_products.map((product, index) => {
                    return (
                        <div className="col-lg-3 col-md-6"
                             onClick={() => getProduct(product)}
                             key={index}>
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
                        </div>
                    )
                })
                }
            </div>
        </div>
        <div className="container home_product_container">
            <div className="home_product_title">
                <div>
                    <h2>Items Under $200</h2>
                </div>
                <Link href={`/collections/${under_products[0].handle}`}>View All</Link>
            </div>

            <div className="row">
                {home_under_products.map((product, index) => {
                    return (
                        <div className="col-lg-3 col-md-6"
                             onClick={() => getProduct(product)}
                             key={index}>
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
                        </div>
                    )
                })
                }
            </div>
        </div>
        <div className="container home_instagram_container">
            <div className="home_instagram_title">
                <h3>Follow on instagram</h3>
                <a href="#">@sikacci_jewelry <BsArrowRight/></a>
            </div>
            <div className="home_instagram">
                <div>
                    <img src="insta.jpg" alt="instagram"/>
                </div>
            </div>
            <div className='row home_subscribe'>
                <div className="col-md-6"><img src={homepage.subscribe_image.url} alt=""/></div>
                <div className="col-md-6">
                   <p>{homepage.subscribe_text[0].text}</p>
                    <form action="" method="POST">
                        <input id="name" type="text" autoComplete="name" placeholder="Enter your email address" required/>
                        <button type="submit">Submit <BsArrowRight/> </button>
                    </form>
                </div>
            </div>
        </div>
        {/*<InstagramEmbed*/}
        {/*    url='https://www.instagram.com/p/B8qn8hJFD5K/'*/}
        {/*    clientAccessToken='326011549072699|IGQVJYeTVKampjVUF2dXJYZAVVSY2JhakY1WmlSOVNpQjdpU1AxRmFLVElKNlhXSTBmMGhybURIb0NvMmYxTFZA4X0JZAd0dXelRtUnBFU2dCaURjcnZAzWmVYS1ZAnbTE4MnhNc1Q1YWxrWkNudWFjdVo2WAZDZD'*/}
        {/*    maxWidth={320}*/}
        {/*    hideCaption={true}*/}
        {/*    containerTagName='div'*/}
        {/*    protocol=''*/}
        {/*    injectScript*/}
        {/*    onLoading={() => {}}*/}
        {/*    onSuccess={() => {}}*/}
        {/*    onAfterRender={() => {}}*/}
        {/*    onFailure={() => {}}*/}
        {/*/>*/}
    </MainContainer>
  )
}

export async function getServerSideProps() {
    const collections = await shopifyClient.collection.fetchAllWithProducts()
    const client = Prismic.client("https://paspartoo.prismic.io/api/v2", {})
    const homepage = await client.query(Prismic.Predicates.at('document.type', 'homepage'))
    const slider = await client.query(Prismic.Predicates.at('document.type', 'home_slider'))

    return { props: {
            collections:JSON.parse(JSON.stringify(collections)),
            homepage: homepage,
            slider: slider
        }};
}