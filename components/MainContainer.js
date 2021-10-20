import Head from "next/head";
import Header from "./Header";



export default function MainContainer({children, title}){
    return (
        <>
            <Head>
                <meta keywords="shopify next"></meta>
                <title>Shopify  {title}</title>
            </Head>
            <div id="root">
                    <Header/>
                    {children}
            </div>
        </>
    )
}