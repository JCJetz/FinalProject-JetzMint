import { useMetaMask } from "metamask-react";
import '../App.css'

function WrongNetwork () {

    const { addChain } = useMetaMask();

    const PolygonMumbaiNetworkParams = {
      chainId: "0x13881",
      chainName: "Mumbai",
      rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      blockExplorerUrls: ["https://mumbai.polygonscan.com"]
    };  

    function _handleAddChain (event) {
      event.preventDefault();
      addChain(PolygonMumbaiNetworkParams);
    }

    return(
      <div className="card no-border" style={{background:"#cff4fc"}} id="step-wallet">
        <div className="card-body border-bottom p-3">
          <div className="row align-items-center mx-n3">
            <div className="col text-center">
              <button className="btn btn-polygon btn-lg btn-secondary c-white" onClick={_handleAddChain}>CAMBIAR/AÑADIR RED POLYGON (MATIC) A METAMASK</button>
            </div>
          </div>
          </div>
        </div>
    )  
};

export default WrongNetwork;