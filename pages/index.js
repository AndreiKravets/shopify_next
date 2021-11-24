import MainContainer from "../components/MainContainer";
import {shopifyClient} from "../utils/shopify";
import Prismic from "@prismicio/client";
import Slider from "react-slick";
import Link from "next/link";
import React from "react";
import Card from "../components/Card"
import InstagramEmbed from 'react-instagram-embed';



export default function Home({collections,homepage,slider}) {
    console.log(collections)
    console.log(homepage)
    console.log(slider)
    homepage = homepage.results[0].data
    slider = slider.results
    const home_collections = collections.filter(collection => collection.handle == 'chain' || collection.handle == 'combos' || collection.handle == 'bracelets')
    const temp_all_products = collections.filter(collection => collection.handle == 'all-products')
    const home_all_products = temp_all_products[0].products.slice(0,8)
    const temp_under_products = collections.filter(collection => collection.handle == 'under-200')
    const home_under_products = temp_all_products[0].products.slice(0,4)
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        }

  return (
    <MainContainer>
        <div className="container-fluid home_top_section">
            <div className="container">
                <Slider {...settings}>
            {slider.map((slide,index) => {
                return(

                    <div className="row" key={index}>
                        <div className="col-md-6">
                            <h1>{slide.data.title[0].text}</h1>
                            {slide.data.subtitle.map((paragraph, index) => {
                                return (
                                paragraph.text
                                )
                            })}
                        </div>
                        <div className="col-md-6">
                            <img src={slide.data.big_image.url} />
                            <img src={slide.data.small_image.url} />
                        </div>
                    </div>

                )


            })}
                </Slider>
            </div>
        </div>
        <div className="container">
          <div className="row">
            {home_collections.map((product, index) => {
              return (
                <div className="col-md-4" key={index}>
                    <div style={{backgroundImage: `url(${product.image.src})`}}>
                        <Link href={`/collections/${index}`}>{product.handle}</Link>
                        <h5>Look More</h5>
                    </div>
                </div>
              )
             })
            }
          </div>
        </div>
        <div className='container'>
            <div className='d-flex'>
                {homepage.legendary_text[0].text}
                <img src={homepage.legendary_image.url} alt=""/>
            </div>
        </div>
        <div className="container">
            <h1>Best Sellers</h1>
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
            <h1>Items Under $200</h1>
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

        <div className="container">
            <InstagramEmbed
                url='https://www.instagram.com/'
                clientAccessToken='123|456'
                maxWidth={320}
                hideCaption={true}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
            />
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