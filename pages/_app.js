import React from 'react';
import App from 'next/app';
import { AnimatePresence } from 'framer-motion';
import '../styles/bootstrap.css';
import '../styles/global.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
    );
  }
}

export default MyApp;