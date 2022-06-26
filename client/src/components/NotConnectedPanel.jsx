import { FaRegCircle } from "react-icons/fa";

export default function NotConnectedPanel (props) {

    let status = props.status;
    let statusmsg = "Conectar Metamask"
    let buttonmsg = "Connectar"
    //let func = ""

    function correctIcon () {
        if (status ==="notConnected") {
            return <FaRegCircle size={24}/>
        }
        if ((status ==="unavailable")) {
            statusmsg = "Instalar Metamask"; buttonmsg="Instalar";return <FaRegCircle size={24}/>
        }
        if (status ==="connecting") {
            statusmsg = "Conectar Metamask"; buttonmsg="Conectando.."; return <FaRegCircle size={24}/>
        }
    }

    function _handleFunction (event) {
        if (status ==="notConnected") {
            event.preventDefault();
            props.connect();
        } else {
            event.preventDefault();
            window.open('https://metamask.io/', '_blank')
        }
    }
  

    return  (

        <div className="card no-border" id="step-wallet">
            <div className="row align-items-center mx-n3">
                <div className="card-body">
                    <div className="row align-items-center mx-n3">
                        <div className="col-6">
                            <div className="heading heading-5 mb-0">
                            <i className="far fa-fw alpha-3 mr-2">{correctIcon()}</i> {statusmsg}</div>
                        </div>
                        <div className="col-6 text-end">
                            {buttonmsg === "Instalar" ?
                            <button onClick={_handleFunction} className="btn btn-mm btn-lg btn-icon-left bg-success c-white btn-circle">{buttonmsg}</button>
                            :
                            <button onClick={_handleFunction} className="btn btn-mm btn-lg btn-icon-left bg-success c-white btn-circle">{buttonmsg}</button>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}