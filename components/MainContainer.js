import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import {motion, AnimatePresence } from "framer-motion";
import React from "react";





export default function MainContainer({children, title,isVisible}){
    const variants = {
        hidden: { opacity: 0, x: -200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 1, x: -2000, y: -100 },
    }
    return (
        <>
            <Head>
                <meta keywords="shopify next"></meta>
                <title>Shopify  {title}</title>
            </Head>
            <div id="root">
                    <Header/>
                <AnimatePresence>
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
                </AnimatePresence>
                    <Footer/>
            </div>
        </>
    )
}