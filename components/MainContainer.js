import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import {motion } from "framer-motion";
import { useEffect } from "react";



export default function MainContainer({children, title,isVisible}){
    useEffect(() => {
        window.scrollTo(0, 1);
    },[])

       const variants = {
            hidden: {scale: 1, x: 0, opacity: 0.5},
            enter: {scale: 1, x: 0, opacity: 1, transition: {duration: 0.15, ease: [0.48, 0.15, 0.25, 0.96]}},
            exit: {
                scale: 1,
                x: -500,
                opacity: 0,
                transition: {duration: 0.15, ease: [0.48, 0.15, 0.25, 0.96]}
            }
        }

    return (
        <>
            <Head>
                <meta keywords="shopify next"></meta>
                <title>Shopify  {title}</title>
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