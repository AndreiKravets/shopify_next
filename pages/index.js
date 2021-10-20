import MainContainer from "../components/MainContainer";

export default function Home() {
  return (
    <MainContainer>
        <div className="container-fluid home_top_section">
            <img src="/homebaner.jpg" alt="home"/>
            <div className="container">
        <h1>Grand Opening</h1>
            <p>Any order <span>over $500</span> receives official <br/> <span>Sikacci vintage tee</span></p>
            </div>
        </div>
    </MainContainer>
  )
}