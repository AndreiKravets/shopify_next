import MainContainer from "../components/MainContainer";
import Prismic from "@prismicio/client";

export default function About({ data }) {
const about = data.results[0].data
    console.log(about)
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
                            <img src={about.banner.url} alt={`${about.banner.alt}`}/>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    )
}

export async function getServerSideProps() {
    const client = Prismic.client("https://paspartoo.prismic.io/api/v2", {})
    const data = await client.query(Prismic.Predicates.at('document.type', 'about'))
    return {props: {data: data}}
}