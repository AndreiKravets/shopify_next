import MainContainer from "../components/MainContainer";
import {shopifyClient} from "../utils/shopify";
import Prismic from "@prismicio/client";
import Slider from "react-slick";
import Link from "next/link";
import React from "react";


export default function Home({collections,homepage,slider}) {
    console.log(collections)
    console.log(homepage)
    console.log(slider)
    homepage = homepage.results[0].data
    slider = slider.results

        var settings = {
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
                                    <p key={index}>{paragraph.text}</p>
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
            {collections.map((product, index) => {
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