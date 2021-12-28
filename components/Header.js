import React, {useEffect, useState} from 'react'
import Link from "next/link"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP, FaShoppingCart,FaRegHeart } from 'react-icons/fa'
import { RiShoppingCartLine } from "react-icons/ri";
import Menu from "./menu";
import cart_store from "../store/cart_store";
import {observer} from "mobx-react-lite";


const Header = observer( ()=> {
    const [loaded, setLoaded] = useState(true)
    useEffect(() => {

        function cartInit() {
            if ((window.localStorage.getItem("cart"))){
                cart_store.setCount((window.localStorage, JSON.parse(window.localStorage.getItem("cart")).lineItems.length))
            }
        }

        if (loaded){
            cartInit()
            setLoaded(false)
        }
    }, []);

    const [activeMenu, setActiveMenu] = useState(false)
    const [activeStickyMenu, setActiveStickyMenu] = useState(false)

    const menuScroll = () => {
        if(window.scrollY > 90){
            setActiveStickyMenu(true)
        }
        else {
            setActiveStickyMenu(false)
        }
    };
    if (process.browser) {
        window.addEventListener('scroll', menuScroll);
    }
    return(
    <header>
        <div className="header_fluid">
            <div className="container">
                <div className="row head_menu">
                    <button id="hamb_button"
                            className={activeMenu ? "hamburger hamburger--collapse is-active" : "hamburger hamburger--collapse"}
                            onClick={() => {
                                setActiveMenu(!activeMenu);
                            }}
                            type="button"><span className="hamburger-box"><span
                             className="hamburger-inner"></span></span></button>
                    <div className="col-auto header_logo">
                        <img src="/logo.svg" alt=""/>
                    </div>
                    <div className="col head_menu_col">
                        <div className="menu-menu-container">
                           <Menu/>
                        </div>
                    </div>
                    <div className="col-auto header_btn">
                        <FaRegHeart/>
                        <Link href="/cart"><a><RiShoppingCartLine/>{cart_store.count}</a></Link>
                    </div>
                </div>
            </div>

            <div
                className={activeMenu ? "mobile_menu mobile_menu_top active" : "mobile_menu mobile_menu_top"}>
                <div className="menu_mobile">
                    <Menu/>
                    <div className="mob_menu_social">
                        <ul id="menu-social-link" className="footer_social">
                            <li><a href="#"><FaFacebookF/></a></li>
                            <li><a href="#"><FaTwitter/></a></li>
                            <li><a href="#"><FaLinkedinIn/></a></li>
                            <li><a href="#"><FaPinterestP/></a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>


        <div className={activeStickyMenu ? "fixed-bar animated-quick fadeInDown header_fluid" : "fixed-bar animated-quick fadeOutUp header_fluid"}>
            <div className="container">
                <div className="row head_menu valign-wrapper">
                    <div className="col-auto header_logo">
                        <img src="/logo.svg" alt=""/>
                    </div>
                    <div className="col head_menu_col">
                        <div className="menu-menu-container">
                            <Menu/>
                        </div>
                    </div>
                    <div className="col-auto header_btn">
                        <FaRegHeart/>
                        <Link href="/cart"><a><RiShoppingCartLine/>{cart_store.count}</a></Link>

                    </div>
                </div>
            </div>
        </div>
    </header>
    )
})
export default Header