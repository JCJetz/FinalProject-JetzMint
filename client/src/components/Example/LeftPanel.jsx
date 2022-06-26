function LeftPanel () {


    return (
        <div className="col-lg-7 mb-3">
          <div className="profile-picture profile-picture--style-2 mx-0 mb-2 d-inline-block">
            <img src="https://i.imgur.com/vHJwieq.gif" alt="image" className="mt-0 bg-white border-white"></img>
          </div>
          <h1 className="heading heading-1">
            NEOLAND BOOTCAMP NFT
          </h1>
          <div className="row mt-4 text-md">
            <div className="col-6 col-lg-4 mb-4">
              <div className="text-uppercase text-sm text-muted">Mint Date </div>
              <span>June 20, 2022 5 p.m. UTC</span>
            </div>
            <div className="col-6 col-lg-4 mb-4">
              <div className="text-uppercase text-sm text-muted">Mint Price </div>
              <span><i className="fab fa-ethereum c-muted mr-1"></i>0.00Ξ</span>
              <div className="col-6 col-lg-4 mb-4">
                <div className="text-uppercase text-sm text-muted">Number of Winners </div>
                <span>
                    <i className="fad fa-ticket c-muted mr-1"></i>
                      999 Spots
                </span>
              </div>
            </div>
            <div className="col-6 col-lg-4 mb-4">
                <div className="text-uppercase text-sm text-muted">Official Link</div>
                <span>
                  <i className="fas fa-link c-muted mr-1"></i>
                  <a href="https://mint.anondegenz.io" target="_blank" className="c-base-1">mint.anondegenz.io</a>
                </span>
            </div>
          </div>
          <div className="mr-lg-5 d-none d-lg-block" id="project-description">
            <p>Necesitará una billetera digital para reclamar su NFT conmemorativo. <a href="https://metamask.io/faqs/"target="_blank"> Metamask</a></p>
            <p><img src="https://anondegenz.io/wp-content/uploads/2022/04/adz-pr.png" alt="img" width="559" height="397"></img></p>
            <p>&nbsp;</p>
            <p>Este proyecto presenta una colección de NFT conmemorativos del Bootcap Web Developer 
              Full-Time de NEOLAND - School.&nbsp;</p>
            <p><strong>Para acceder, primero logueate con el Slack.</strong></p>
            <h4>--------------------------------------------------</h4>
            <p>Este es un NFT no especulativo, con tecnología Blockhain de validación .&nbsp;</p>
            <p>&nbsp;</p>
            <p><em>Este NFT estará en la cadena de bloques ( blockchain) de Polygon. 
              Polygon ofrece una solución de capa 2 (L2) es una cadena de bloques que se ejecuta en paralelo a una red principal, 
              en el caso de Polygon, Ethereum, pero procesa transacciones fuera de la red principal, dando un mayor rendimiento 
              (velocidad de transacción) y tarifas más bajas de gas..</em></p>
            <p>&nbsp;</p>
          </div>
        </div>
    )
}

export default LeftPanel;