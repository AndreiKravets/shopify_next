import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";
import {motion} from "framer-motion";
import React from "react";

export default function About({ data }) {
const about = data.results[0].data
    console.log(about)

    let easing = [0.175, 0.85, 0.42, 0.96];

    const imageVariants = {
        exit: { y: 150, opacity: 0, transition: { duration: 0.5, ease: easing } },
        enter: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 2.5,
                ease: easing
            }
        }
    };
    const backVariants = {
        exit: {
            x: 100,
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: easing
            }
        },
        enter: {
            x: 0,
            opacity: 1,
            transition: {
                delay: 0.5,
                duration: 0.5,
                ease: easing
            }
        }
    };
    return (
        <MainContainer>
            <div className="container-fluid about_top_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                         <h1>{about.title[0].text}</h1>
                            {about.content.map((paragraph, index) => {
                                return (
                                    <p key={index}>{paragraph.text}</p>
                                )
                            })}
                        </div>
                        <div className="col-md-6">
                            <motion.img variants={imageVariants} src={about.banner.url} />
                            <img src={about.banner.url} alt={`${about.banner.alt}`}/>
                        </div>
                    </div>
                </div>
            </div>
            <motion.div variants={backVariants}>
                    <h1>Back to list</h1>
            </motion.div>
        </MainContainer>
    )
}

export async function getServerSideProps() {
    const client = Prismic.client("https://paspartoo.prismic.io/api/v2", {})
    const data = await client.query(Prismic.Predicates.at('document.type', 'about'))
    return {props: {data: data}}
}