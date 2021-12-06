import MainContainer from "../components/MainContainer";
import {shopifyClient} from "../utils/shopify";
import Prismic from "@prismicio/client";
import Slider from "react-slick";
import Link from "next/link";
import React, {Fragment} from "react";
import Card from "../components/Card";
import {motion} from "framer-motion";
import { BiRightArrowAlt } from "react-icons/bi";



export default function Home({collections,homepage,slider,isVisible}) {
    homepage = homepage.results[0].data
    slider = slider.results
    const home_collections = collections.filter(collection => collection.handle == 'chain' || collection.handle == 'combos' || collection.handle == 'bracelets')
    const all_products = collections.filter(collection => collection.handle == 'all-products')
    const home_all_products = all_products[0].products.slice(0,8)
    const under_products = collections.filter(collection => collection.handle == 'under-200')
    const home_under_products = under_products[0].products.slice(0,4)
    console.log(all_products)
        const settings = {
            dots: false,
            arrows: false,
            infinite: true,
            speed: 500,
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1
        }

  return (
    <MainContainer>
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
                <div className="col-md-5">{homepage.legendary_text[0].text}</div>
                <div className="col-md-5"><img src={homepage.legendary_image.url} alt=""/></div>
            </div>
        </div>
        <div className="container">
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
                        <div className="col-md-3" key={index}>
                            <Card
                                images={product.images[0].src}
                                index={index}
                                id={product.id}
                                handle={product.handle}
                                title={product.title}
                                description={product.description}
                                price={product.variants[0].price}
                            />
                        </div>
                    )
                })
                }
            </div>
        </div>
        <div className="container">
            <div className="home_product_title">
                <div>
                    <h2>Items Under $200</h2>
                </div>
                <Link href={`/collections/${under_products[0].handle}`}>View All</Link>
            </div>

            <div className="row">
                {home_under_products.map((product, index) => {
                    return (
                        <div className="col-md-3" key={index}>
                            <Card
                                images={product.images[0].src}
                                index={index}
                                id={product.id}
                                handle={product.handle}
                                title={product.title}
                                description={product.description}
                                price={product.variants[0].price}
                            />
                        </div>
                    )
                })
                }
            </div>
        </div>

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