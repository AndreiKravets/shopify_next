import React, {useState} from 'react';
import MainContainer from "../components/MainContainer";
import Link from "next/link"
import {shopifyClient} from "../utils/shopify"
import Image from 'next/image'
import {motion} from "framer-motion";


const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
}
const Collections = ({products}) => {
    return (
        <MainContainer>
            <div className="container-fluid products_top_section">
                <div>
                    <p>collection</p>
                    <h1>All Collection</h1>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {products.map((product, index) => {
                        return (
                            <motion.div className="col-12 collection_col" initial="hidden" whileInView="visible" key={product.id} variants={{
                                hidden: {
                                    scale: .5,
                                    opacity: 0,
                                    y: -100
                                },
                                visible: {
                                    scale: 1,
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                        delay: .2,
                                        duration: .2, ease: [0.48, 0.15, 0.25, 0.96]
                                    }
                                }
                            }}>
                                  <div className="home_collections_section_inner">
                                    <Image
                                    loader={myLoader}
                                    src={product.image.src}
                                    alt={product.title}
                                    layout='fill'
                                    objectFit='cover'
                                    objectPosition='center'
                                    />
                                <h2><Link href={`/collections/${product.handle}`}>{product.title}</Link></h2>
                            </div>
                            </motion.div>
                        )
                    })
                    }
                </div>
            </div>

        </MainContainer>
    )
}

export default Collections
export async function getServerSideProps() {
    const collections = await shopifyClient.collection.fetchAllWithProducts()
    return {props: {products: JSON.parse(JSON.stringify(collections))}}
}
