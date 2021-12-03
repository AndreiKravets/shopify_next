import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import {motion} from "framer-motion";
import React from "react";
import { AnimatePresence } from 'framer-motion'



export default function MainContainer({children, title,isVisible}){
    const variants = {
        hidden: { opacity: 0, x: -200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -100 },
    }
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
                <motion.main
                    variants={variants} // Pass the variant object into Framer Motion
                    initial="hidden" // Set the initial state to variants.hidden
                    animate="enter" // Animated state to variants.enter
                    exit="exit" // Exit state (used later) to variants.exit
                    transition={{ type: 'linear' }} // Set the transition to linear
                    className=""
                >
                    {children}
                </motion.main>
                    <Footer/>
            </div>
        </>
    )
}