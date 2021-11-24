import React, {useState} from 'react'
import Link from "next/link"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP } from 'react-icons/fa'

export default function Footer () {
    return(
        <footer>
            <div className="container">
                <div className="row">
                <div className="col-md-4">
                    <img src="logo.svg" alt=""/>
                    Tracked delivery, easy returns
                    and a lifetime guarantee.
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
                <div className="col-md-4">
                    <h6>Join Our Newsletter</h6>
                </div>
                </div>
            </div>

        </footer>
    )
}