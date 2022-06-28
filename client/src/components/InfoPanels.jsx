//import ImageOAuth from "../assets/images/oauth.png"
//import MetamaskLogo from "./MetamaskLogo.jsx"
import {FaExclamation} from "react-icons/fa";
import {FcCheckmark} from "react-icons/fc";
import {SiAuth0,SiEthereum} from "react-icons/si";
import {BsGear} from 'react-icons/bs';
import {GrDatabase} from 'react-icons/gr';

export default function InfoPanels (props) {

    console.log('Props Infopanels: ', props)

    let status = "oauth"
    status = props.authenticated && !props.isConnected ? "metamask" : status
    status = props.authenticated && props.isConnected && !props.isCorrectNetwork ? "polygon" : status
    status = props.authenticated && props.isConnected && props.isCorrectNetwork ? "mintear" : status
    status = props.authenticated && props.isConnected && props.isCorrectNetwork && props.isMinting ? "minteando" : status
    status = props.authenticated && props.isConnected && props.isCorrectNetwork && !props.isMinting && props.mintData.nft? "minteado" : status
    

    let mtype= "warning";

    function correctIcon () {
        if (status ==="oauth") {mtype="secondary"; return <SiAuth0 size={24}/>}
        if (status ==="metamask") {mtype="warning"; return <SiEthereum size={24}/>}
        if (status ==="polygon") {mtype="info"; return <FaExclamation size={24}/>}
        if (status ==="mintear") {mtype="success";return <FcCheckmark size={24}/>}
        if (status ==="minteando") {mtype="info";return <BsGear size={24}/>}
        if (status ==="minteado") {mtype="success";return <GrDatabase size={24}/>}
    }

    const extension = status !== "minteado" ? ".png" : ".gif";
    let nftnum = "";

    if (props.authenticated && props.mintData.nft) {
        let hex = null;
        hex = props?.mintData?.nft?.metadata?.id?._hex ? props?.mintData?.nft?.metadata?.id?._hex : props?.nft?.metadata?.id?.hex
        console.log('hex: ',hex);
        nftnum = hex ? parseInt(hex, 16)+1 : nftnum
    }

    const paneldata = [
        {cardtype:"oauth",
            header:"Autentificación con OAuth",
            title:"Autentifica tu cuenta de Slack", 
            text:['Haz click en el botón para verificar tu cuenta de Slack.','Este mint está limitado a quienes pertenezcan al servidor/team NEOLAND en Slack.','OAuth solo comparte infomación esencial para verificar tu identidad.'],
            extratext:"Más infomación sobre OAuth y la API de Slack."}
                
        , {cardtype:"metamask",
            header:"Autentificación con Web3 (METAMASK)",
            title:"Conecta tu billetera Metamask", 
            text:['Haz click en el botón para conectar con Metamask.','Metamask es una extensión de navegador para conectar a la red Ethereum (y compatibles).','Permite a los sitios web obtener datos sobre el blockchain, y a los usuarios manejar sus datos e identidades de forma segura, además de firmar mensajes y transacciones.','Tu cuenta está almacenada y encriptada en tu PC, por lo que ninguna información llega a los servidores de Metamask ni a los nuestros.','Es posible que debas recargar la página tras instalar Metamask en tu navegador.'],
            extratext:"Más infomación sobre Metamask y Ethereum."}

        , {cardtype:"polygon",
            header:"Añade la red Polygon (MATIC) a Metamask",
            title:"Este proyecto utiliza la red Polygon para un minteo sin coste (gasless)", 
            text:['Polygon es compatible con la Máquina Virtual de Ethereum (EVM), pero tiene costes de transacción muy inferiores, lo que permite minteos sin gas con transacciones delegadas a cargo del emisor.','Cuando pulses sobre el botón, metamask pedirá tu aprovación para cambiar a la red Polygon. Si no dispone de la red, primero te pedirá permiso para añadirla.'],
            extratext:"Más infomación sobre Polygon y EVM."}
        
        , {cardtype:"mintear",
            header:"Ya puedes mintear tu NFT!",
            title:"No recibirás un NFT cualquiera. Estas son algunas de sus peculiaridades.", 
            text:['Soulbound": El token resultante no es especulativo (no transferible)','"Proof of Attendance": Enlaza tu actividad a tu billetera de forma anónima (utilizando únicamente tu id de Slack).','"Gasless": Si conoces o has utilizado Metamask/Ethereum, sabrás que cualquier transacción requiere pagar una tasa (gas), JETZMINT utiliza mint delegado para una experiencia de onboarding fluída.'],
            extratext:"Más infomación sobre Soulbound y POAP."}

        , {cardtype:"minteando",
            header:"Tu transacción se está procesando. Puede tardar unos minutos",
            title:"JETZMINT interacciona con el blockchain seleccionado y se ocupa de los costes y posibles errores", 
            text:['El NFT incluirá tu ID alfanumérico de Slack como único detalle identificativo','También incluirá la numeración de tu NFT dentro de los 100 disponibles','No podrás venderlo ni transferirlo. Tu NFT no es especulativo, así que aunque el diseño es precioso, no podrás venderlo. Representa una actividad, y puede darte acceso a comunidades, descuentos, oportunidades, eventos.. dentro o fuera de la Web3.'],
            extratext:"Más infomación sobre el mint delegado y los contratos compartidos de thirdweb."}
        
        , {cardtype:"minteado",
            header:`Transacción completada. Tienes el NFT ${nftnum} de 100`,
            title:"Tu NFT aparecerá automáticamente en tu billetera y en Opensea", 
            text:['Tu nuevo NFT se ha transferido exitosamnte a tu billetera.','Puedes verlo en Opensea clickando el enlace, aunque tal vez tarde unos minutos en ser indexado.','Accede con él a nuestra zona de usuarios para acceder a las funciones de firma, participar en la comunidadad y recibir promociones asociadas.','Bienvenido a la WEB3.'],
            extratext:"Más infomación sobre el mint delegado y los contratos compartidos de thirdweb."}
    ]

    // busco en array de obj aquel que corresponde al 'status'
    const usedtext = paneldata.find((k,v) => k.cardtype === status);

    // pinto un <li> por cada elemento en el paneldata.text correspondiente
    const renderLists = usedtext.text.map((text,k) =>  <li style={{marginBottom: "4px"}} key={`${k}`}>{text}</li>);

    return (

        <div className="col-lg-6 mb-3">
            {props.hasLoaded &&
            <div ref={props.infoPanelRef} className={`card border-warning mb-3 z-depth-1 ${usedtext.cardtype}`}>
                <div className="card-header" style={{padding: "16px 10px 10px 20px",fontWeight: "bold"}}>
                    {correctIcon()} {usedtext.header}
                </div>
                <div className="card-body">
                    <div className="row g-0">
                        <div className="col-md-9">  
                            <div className={`alert alert-${mtype} fade show`} role="alert">                        
                                {usedtext.title}
                            </div>
                            <div className="card-text">
                                <ul style={{paddingLeft: "6px"}}>
                                    {renderLists}
                                </ul>
                            </div>
                            <p className="card-text" style={{marginRight: "40px"}}><small className="text-muted">{usedtext.extratext}</small></p>
                        </div>
                        <div className="col-md-3">
                        {/* 
                            No funciona, de moment otra image
                        <MetamaskLogo />

                        imagen dinámica -> se acepta (y solo se puede con?) require 
                        nombre imagen igual que estado, estado depende de props (auth, connected, etc..)

                        */
                        }
                            <div className={`infoimage_${status}`}>
                                <img src={require(`../assets/images/${status}${extension}`)} alt="Img" className={`img-fluid rounded-start ${status}img`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>

    )

}