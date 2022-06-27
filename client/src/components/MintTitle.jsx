export default function MintTitle (props) {

    let mtype = "success"
    let text = "Disponible"
    let title = "maintitle"
    if (props.userstate?.user?.alreadyMinted) {title="maintitley"; mtype="danger"; text="no disponible"}
    
    return (
        <>

                <div className={`card-title ${title}`}>
                    <div className="row align-items-center mx-n3">
                        <div className="col-xl-9 col-lg-8">
                            <div className="heading heading-3 mb-2 d-block">
                                NFT<span className={`text-${mtype}`}> {text}</span>
                            </div>
                            <div className="heading heading-7 d-block">
                                Emisor: <span className="text-warning"> NEOLAND</span>
                            </div>
                            <div className="heading heading-7 d-block">
                                Activo hasta: <span className="text-warning"> 1/1/2025</span>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-4 text-right" style={{top: "6px"}}>
                            <div className="row">
                                <span style={{borderRadius:"6px",padding:"5px",marginBottom: "4px"}} className="alert alert-dark">
                                    <span className="badgetext">Precio:</span>
                                    <span className="alertbadge">0 Ξ</span>
                                </span>  
                            </div>
                            <div className="row">
                                <span style={{borderRadius:"6px",padding:"5px"}} className="alert alert-dark">
                                    <span className="badgetext">Edición:</span>
                                    <span className="alertbadge">100 Uds.</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="text-uppercase text-sm bg-muted px-4 py-2 bg-muted" style={{paddingTop: ".7rem !important"}}>
                        <strong className="c-base-1 yellow">Requisitos.</strong> Para poder mintear, debes:
                    </div>
                </div>
            
        </>
    )
}