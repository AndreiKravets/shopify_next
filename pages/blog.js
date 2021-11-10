import MainContainer from "../components/MainContainer";

export default function Blog({blog}) {

    return (
        <MainContainer>
            <div className="container-fluid about_top_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1>{blog.content.title}</h1>
                            {blog.content.subtitle}
                        </div>
                        <div className="col-md-6">
                            <img src={blog.content.image} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    )
}

export async function getServerSideProps() {
    const blog = await fetch(
        'https://api.storyblok.com/v1/cdn/stories/blog?version=draft&token=1deDSpUePICJvYfDQ34QGQtt'
    ).then((response) => response.json())
    return {props: {blog: blog.story}}
}