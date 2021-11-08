import MainContainer from "../components/MainContainer";

export default function About({about}) {

console.log(about.content.title)
    return (
        <MainContainer>
            <div className="container-fluid about_top_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                         <h1>{about.content.title}</h1>
                         {about.content.desctiption}
                        </div>
                        <div className="col-md-6">
                            <img src={about.content.image.filename} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    )
}

export async function getServerSideProps() {
    const about = await fetch(
        'https://api.storyblok.com/v2/cdn/stories/about?version=draft&token=1deDSpUePICJvYfDQ34QGQtt'
    ).then((response) => response.json())
    return {props: {about: about.story}}
}