import { useCallback, useEffect } from "react";
import { useMetaMask } from "metamask-react";
import ConnectedPanel from "../ConnectedPanel";
import NotConnectedPanel from "../NotConnectedPanel";

export default function ConnectMM (props) {

    console.log('render connect')

    // Estados devueltos por 'metamask-react'
    const { status, connect, account, chainId, ethereum } = useMetaMask(); 
    
    const actOnEthereumObject = useCallback(() => {

      console.log('mm status changed: ', status)
      console.log('Eth: ', ethereum); 
      // existe y contiene dirección pública activa
      if (status === "connected") {
        props.setIsConnected(true);
        if (ethereum !== null && ethereum.selectedAddress?.length > 1) {
          console.log('Metamask conectado: ', ethereum.selectedAddress);
          console.log(`Añadiendo ${ethereum?.selectedAddress} a estado`);
          // Actualiza estado con address/llave pública/wallet
          props.setEthAddress(ethereum.selectedAddress);
        }
      } else if (status === "notConnected") {props.setIsConnected(false)}
    }, [status,ethereum,props])

    // verificar si existe objeto ethereum cada vez que cambie 'status' de metamark-react
    useEffect(() => {

      actOnEthereumObject();
      //console.log('status: ', status)
        
    },[actOnEthereumObject]);

    return (
      <>
      {props.isConnected && account ? (
        <ConnectedPanel account={account} chainId={chainId} setIsCorrectNetwork={props.setIsCorrectNetwork}/>
        
      ) : <>
      {(status === "unavailable" 
      || status === "notConnected" 
      || status === "connecting" ) && <NotConnectedPanel status={status} connect={connect}/>}
        </>
      }
      </>
    )

};





