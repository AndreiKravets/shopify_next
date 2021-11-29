import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import {motion} from "framer-motion";
import React from "react";



export default function MainContainer({children, title,isVisible}){
    return (
        <>
            <Head>
                <meta keywords="shopify next"></meta>
                <title>Shopify  {title}</title>
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"/>
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"/>
            </Head>
            <div id="root">
                    <Header/>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {children}
                </motion.div>
                    <Footer/>
            </div>
        </>
    )
}