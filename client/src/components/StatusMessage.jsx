import {FaExclamation} from "react-icons/fa";

export default function statusMessage (props) {
    
    // func para mostrar mensaje según estado dentro del proceso de mint

    //console.log('renderizando status')
    
    let message = "Valida tu Id de Slack para empezar";
    let mtype = "warning pinkalert"
    //let icon = "GrValidate"

    if (props.userstate?.authenticated && !props.isConnected) {
      message = "Slack autentificado exitosamente. Conecta ahora tu metamask."
      mtype = "primary"
    } 
    if (props.userstate?.authenticated && props.isConnected) {
      message = "Red incorrecta. Esta aplicación utiliza Polygon"
      mtype = "warning"
      //icon = "FaExclamation"
    }
    if (props.userstate?.authenticated && props.isConnected && props.isCorrectNetwork) {
      message = "Metamask conectado exitosamente. Ya puedes mintear!"
      mtype = "success"
    }

    if (props.userstate?.authenticated && props.isConnected && props.isCorrectNetwork && props.userstate.user?.nftData) {
      message = "Ya has minteado un NFT. Solo uno por persona!"
      mtype = "warning"
    }

    return (

        <div className="row align-items-center mx-n3">
          <div className={`alert alert-${mtype} fade nobottommargin show`} role="alert">
            <FaExclamation /> {message}
          </div>
        </div>

    )
}