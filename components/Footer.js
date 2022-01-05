import React, {useState} from 'react'
import Link from "next/link"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP } from 'react-icons/fa'
import { BsArrowRight } from "react-icons/bs";
import { useKlaviyoForceReload } from '@frontend-sdk/klaviyo'

export default function Footer () {
    useKlaviyoForceReload('<Klaviyo site ID>')
    return(
        <footer>
            <div className="container">
                <div className="row">
                <div className="col-md-4">
                    <img src="logo.svg" alt=""/>
                    <p>Tracked delivery, easy returns and a lifetime guarantee.</p>
                    <ul id="menu-social-link" className="footer_social">
                        <li><a href="#"><FaFacebookF/></a></li>
                        <li><a href="#"><FaTwitter/></a></li>
                        <li><a href="#"><FaLinkedinIn/></a></li>
                        <li><a href="#"><FaPinterestP/></a></li>
                    </ul>
                </div>
                <div className="col-md-2">
                    <h6>Navigate</h6>
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li className="menu_item_has_children">
                            <Link href="/products">Products</Link>
                        </li>
                        <li className="menu_item_has_children">
                            <Link href="/collections">Collections</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-md-2">
                    <h6>Quick Links</h6>
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li className="menu_item_has_children">
                            <Link href="/products">Products</Link>
                        </li>
                        <li className="menu_item_has_children">
                            <Link href="/collections">Collections</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-md-4 footer_newsletter">
                    <h6>Join Our Newsletter</h6>
                    <p>Get the latest news, updates, and promotions sent straight to your inbox.</p>
                    <form action="" method="POST">
                        <input id="name" type="text" autoComplete="name" placeholder="Email" required/>
                        <button type="submit">Subscribe <BsArrowRight/> </button>
                    </form>
                    <div className="klaviyo-form-QTt4jn">qwqwqw</div>
                </div>
                </div>
            </div>

        </footer>
    )
}