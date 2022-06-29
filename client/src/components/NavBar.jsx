
export default function NavBar (props) {

    return (
        <nav ref={props.navbarRef} className="navbar bg-light bg-pink" style={{backgroundColor: "rgb(250, 245, 244)", boxShadow: "rgba(0, 0, 0, 0.23) 0px 4px 12px -2px", padding: "0 20px 0 20px"}}>
            <a className="navbar-brand py-2" href="/">
                <img src={require(`../assets/MainLogo.png`)} height="30" className="d-none d-lg-inline-block" style={{height:"30px"}} alt="JETZMINT"></img>
                <img src={require(`../assets/MainLogo.png`)} height="30" className="d-lg-none" alt="JETZMINT"></img>
            </a>
        </nav>
    )
}