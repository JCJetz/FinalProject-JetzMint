import { useEffect,useState } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/boomerang.min.css';

import SlackOauth from "../SlackOauth";
import LoadingWheel from "../LoadingWheel";
import '../../App.css';
import sendEthAddressAndMint from '../../utils/sendEthAddressAndMint.js'
import ConnectMM from "../ConnectMM/ConnectMM";


import NavBar from "../NavBar";
import ProjectBanner from "../ProjectBanner";
import Requisitos from "../Requisitos";
import MintTitle from "../MintTitle";
import InfoPanels from "../InfoPanels";
import MintButton from "../MintButton";
import MintResponse from "../MintResponse";
import StatusMessage from "../StatusMessage";
import WrongNetwork from "../WrongNetwork";
import Footer from "../Footer";

import {useRef} from 'react';


function NeolandExample() {

  const [userstate, setUserstate] = useState([{user:{},error:null,authenticated:false,connected:false,correctnetwork:false,alreadyMinted:false}])

  // state para el "loading.."
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [ethAddress, setEthAddress] = useState("");
  const [mintData, setMintData] = useState([{tx:"",id:null,nft:null}]);
  const [isMinting, setIsMinting] = useState(false);
  console.log('hasloaded: ', hasLoaded);
  console.log('Mint Data: ', mintData?.nft)

  useEffect(() => {

    // Pedimos estado del usuario al backend 
    // (envia credenciales y comprueba si existe usuario?)
    console.log('Fetching user from backend..');
    fetch("/api/auth/login/status", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
    .then(response => {
        // Éxito si respuesta es 200, convertir la respuesta en json
        console.log('Response: ', response);
        if (response.status === 200) return response.json();
        if (response.status === 401) {
          setHasLoaded(true);
          throw new Error("el usuario no pudo ser autentificado");
        }
        
    })
    .then(responseJson => {
        // respuesta en json, 
        console.log('User desde fetch: ',responseJson.user);
        // establecemos estado de userstate como 'authentificated',
        setUserstate({...userstate, authenticated: true, user: responseJson.user});
        // estado del mint añadido desde backend (si existe)
        responseJson.user.isMinting ? setIsMinting(true) : setIsMinting(false);
        if (responseJson.user.nftData?.metadata) {
          setMintData({nft: responseJson.user.nftData});
        }
        // estado para loading wheel
        setHasLoaded(true);
    })
    .catch(error => {
        // Oauth fallida, seteando como no authed
        setUserstate({
          authenticated: false,
          error: "Failed to authenticate user"
        })
        setHasLoaded(true);
    });
  },[]);

  // TEST. Cambios estado userstate
  useEffect(() => {
    console.log('Estado usuario actualizado: ',userstate);
    if(userstate.mintTx?.id) {  
      console.log('Axtualización de estado contiene mintData: ',userstate.mintTx?.receipt?.transactionHash);
      setMintData({tx: userstate.mintTx?.receipt?.transactionHash, 
                   id: userstate.mintTx?.id?.hex,
                  nft: userstate.nftData});
    } 
  }, [userstate]) 

  // TEST. Cambios wallet address
  useEffect(() => {
    console.log('Wallet address actualizada: ',ethAddress) 
  }, [ethAddress]) 

  async function _handleMint (event) {
    event.preventDefault();
    setUserstate({...userstate, isMinting: true});
    setIsMinting(true);
    const tx = await sendEthAddressAndMint(ethAddress,setUserstate,userstate,setMintData,setIsMinting);
  }

  // Scrollear con el infopanel si está muy abajo
  const infoPanelRef = useRef();
  if (infoPanelRef.current && (isConnected || isCorrectNetwork || isMinting || mintData.nft)) {
    infoPanelRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  // Navbar fija, no me va con bootstrap //
  const navbarRef = useRef();
  // When the user scrolls the page, execute myFunction
  window.onscroll = function() {myFunction()};
  //var navbar = document.getElementById("navbar");
  // Get the offset position of the navbar
  var sticky = navbarRef.current?.offsetTop;

  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function myFunction() {
    if (window.pageYOffset >= sticky) {
      navbarRef.current?.classList.add("sticky")
    } else {
      navbarRef.current?.classList.remove("sticky");
    }
  } 

  return (

    <div className="body-wrap" style={{overflowX: "unset"}}>
      <div id="st-container" className="st-container" style={{overflowX: "unset"}}>
        <div className="st-pusher">
          <div className="st-content">
            <div className="st-content-inner" style={{backgroundColor: "#f1f1f1"}}>
              <NavBar navbarRef={navbarRef}/>
              <div className="content">
                < ProjectBanner />       
                <section className="slice sct-color-2" style={{backgroundColor: "rgb(250, 245, 244)", boxShadow: "rgba(0, 0, 0, 0.17) 0px 1px 32px 6px"}}>
                  <div className="container container-over-top">
                    <div className="row">
                      <div className="col-lg-6 ml-lg-auto mb-5">

                        <div className="form-default">

                          <div className="card z-depth-3 rounded-xl overflow-hidden">

                            <MintTitle userstate={userstate} />
                            <Requisitos />
                            <StatusMessage userstate={userstate}
                            isCorrectNetwork={isCorrectNetwork}
                            isConnected={isConnected}
                            />

                            {hasLoaded ? 
                            <>
                              <SlackOauth
                                authenticated={userstate?.authenticated}
                                userstate={userstate}
                                setUserstate={setUserstate}
                                setIsCorrectNetwork={setIsCorrectNetwork}
                              />  
                                {userstate?.authenticated && 

                                  <ConnectMM 
                                  setIsCorrectNetwork={setIsCorrectNetwork}
                                  setUserstate={setUserstate}
                                  setIsConnected={setIsConnected}
                                  setEthAddress={setEthAddress}
                                  isConnected={isConnected}
                                  userstate={userstate}/>
                                
                                }
                                        
                              {(isConnected && !isCorrectNetwork) && <WrongNetwork />}

                              <div className="card rounded-0  text-center no-border" id="mint_button">
                                <MintButton 
                                  userstate={userstate}
                                  isConnected={isConnected}
                                  isCorrectNetwork={isCorrectNetwork}
                                  isMinting={isMinting}
                                  mintData={mintData}
                                  _handleMint={_handleMint}
                                />
                              </div>
                              {/* to fix */}
                              {userstate.user?.nftData && 
                        
                                <MintResponse nft={userstate.user?.nftData} origin={"database"}/>

                              }
                              {(userstate.nftData && userstate.alreadyMinted) && 

                                <MintResponse nft={userstate.nftData} origin={"userstate"}/>

                              }
                                
                                {/*<p class="text-danger strong-700 p-2">Cannot register until you connect accounts above.</p>
                                */}
                            </>
                              :
                              <div className="card no-border" id="step-wallet">
                                <div className="card-body border-bottom p-3">
                                  <div className="row align-items-center mx-n3">
                                    <LoadingWheel />
                                  </div>
                                </div>
                              </div>
                            }

                            <Footer />
                            
                          </div>
                        </div>            
                      </div>
                      
                      <InfoPanels hasLoaded={hasLoaded} 
                      authenticated={userstate?.authenticated} 
                      isConnected={isConnected}
                      isCorrectNetwork={isCorrectNetwork}
                      isMinting={isMinting}
                      mintData={mintData}
                      infoPanelRef={infoPanelRef}
                      />

                    </div>
                  </div>
                </section>     
              </div>           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NeolandExample;