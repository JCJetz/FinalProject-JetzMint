import { FaRegCircle } from "react-icons/fa";
import WrongNetwork from "./WrongNetwork";
import '../App.css'

function Step (props) {

    console.log(props)

    function correctNetwork() {

            //props.setUserstate(usrstate => ({...usrstate, correctnetwork:false}))
            return <div className="card no-border" style={{background:"#d8c5f7"}} id="step-wallet">
            <div className="card-body border-bottom p-3">
                <div className="row align-items-center mx-n3">
                        <WrongNetwork />
                </div>
            </div>
         </div>
    }

    return (

        correctNetwork()
    )
    
}
export default Step;