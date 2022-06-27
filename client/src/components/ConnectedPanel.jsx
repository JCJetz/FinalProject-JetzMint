import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function ConnectedPanel (props) {

    const networks = {
        "Ethereum": "0x1", // 1
        // Test nets
        "Ethereum Goerli": "0x5", // 5
        "Ethereum Ropsten": "0x3", // 3
        "Ethereum Rinkeby": "0x4", // 4
        "Ethereum Kovan": "0x2a", // 42
        "Polygon Mumbai": "0x13881", // 80001
        // Layers 2
        "Arbitrum": "0xa4b1", // 42161
        "Optimism": "0xa", // 10
        // Side chains
        "Polygon": "0x89", // 137
        "GnosisChain": "0x64", // 100
        // Alt layer 1
        "Binance Smart Chain (BNB)": "0x38", // 56
        "Avalanche": "0xa86a", // 43114
        "Cronos": "0x19", // 25
        "Fantom": "0xfa" // 250
    }
  
    function NetworkIdToName(map, searchValue) {
        for (let [key, value] of Object.entries(map)) {
          if (value === searchValue)
            return key;
        }
    }

    let correctclass="correct"

    // chckea si red correcta, setea estado para paneles, y marca color de las letras 
    // de la red actual (remarca rojo si no es polygon)
    function checkAndSetAsCorrectNetwork() {
        if (props.chainId === "0x89") {
          console.log('setting network as correct')
          props.setIsCorrectNetwork(true);
        } else {
          console.log('setting network as incorrect')
          props.setIsCorrectNetwork(false);
          correctclass = "incorrect";
        }
    }
    
    useEffect(() => {
    
        checkAndSetAsCorrectNetwork();
      
    }, [props.chainId])


    return (
        <div className="card no-border" style={{background: "#F0FFF0"}} id="step-wallet">
            <div className="card-body border-bottom p-3">
                <div className="row align-items-center mx-n3">
                    <div className="col-4">
                        <div className="heading heading-5 mb-0 text-success">
                        <i className="fas fa-fw text-success mr-2"><FaCheckCircle /></i>  Metamask
                        </div>
                    </div>
                    <div className="col-8 text-end">
                        <span className="badge badge-pill badge-lg text-md strong bg-white c- text-wrap text-left z-depth-1-top btn-circle text-lowercase marginright" style={{color:"#55595c"}}>
                        <div>{`${props.account.substring(0, 5)}...${props.account.substr(-5)}`}</div>
                        </span>
                        <span className={`badge badge-pill badge-lg text-md strong bg-white c- text-wrap text-left btn-circle text-lowercase ${correctclass}`}>
                        <div>{NetworkIdToName(networks,props.chainId)}</div>
                        </span>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}