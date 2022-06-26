import { GrTools } from "react-icons/gr";
import { Rings, Hearts } from 'react-loading-icons'

export default function MintButton (props) {

    console.log('rendering button...', props.isMinting)

    if (props.userstate.authenticated && props.isConnected 
        &&  props.isCorrectNetwork 
        && !props.userstate?.user?.alreadyMinted && !props.isMinting && !props.userstate.mintTx?.id) { 
          return <div className="card-body">
            <button onClick={props._handleMint} className="btn btn-styled btn-success btn-xl btn-block">MINTEAR! <i className="fas ml-3" style={{filter:"invert(100%)"}}><GrTools /></i></button>
          </div>
    } 
    if (props.userstate.authenticated && props.isConnected && props.isMinting) {
      return <div className="card-body">
      <button onClick={props._handleMint} className="btn btn-styled btn-success btn-xl btn-block minting">MINTEANDO.. <i className="fas ml-3"><Rings fill="#fff" width="44" height="44" strokeOpacity={.125} speed={.65}/></i></button>
      </div>
      } 
    if (props.userstate.authenticated && ((props.userstate?.user?.alreadyMinted && props.userstate?.user?.nftData) || props.mintData.id)) {
      return <div className="card-body">
      <div className="alert alert-success mintedalert" >
        <div className="row align-items-center mx-n3">
          <div className="col-3">
            <Hearts fill="#fff" width="44" height="44" strokeOpacity={.125} speed={.65}/>
          </div>
          <div className="col-6"><span className="minted">MINTEADO CON ÉXITO</span></div>
          <div className="col-3"><i className="fas ml-3" style={{marginLeft:"4px"}}><Hearts fill="#fff" width="44" height="44" strokeOpacity={.125} speed={.65}/></i></div>
          </div>
        </div>
      </div>
    } else { return <div className="card-body">
      <button className="btn btn-styled btn-success btn-xl btn-block disabled">MINTEAR! <i className="fas ml-3" style={{filter:"invert(100%)"}}><GrTools /></i></button>
    </div>
    }  

}