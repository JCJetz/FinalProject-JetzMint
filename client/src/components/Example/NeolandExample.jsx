import { useEffect,useState } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/boomerang.min.css';
//import 'font-awesome/css/font-awesome.min.css';

import SlackOauth from "../SlackOauth";
import LoadingWheel from "../LoadingWheel";
import '../../App.css';
import sendEthAddressAndMint from '../../utils/sendEthAddressAndMint.js'
//import LeftPanel from "./LeftPanel";
import ConnectMM from "../ConnectMM/ConnectMM";
//import checkMintedNft from "../../utils/checkMintedNft.js";


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

    //const authAPI = process.env.REACT_APP_AUTH_API_URL;
    // Mandamos oauth de slack al backend
    console.log('Trying to fetch from backend..');
    fetch("/api/auth/login/success", {
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
          console.log('error 401 from backend');
          setHasLoaded(true);
          throw new Error("failed to authenticate user");
        }
        
    })
    .then(responseJson => {
        // respuesta en json, seteamos estado como 'authentificated' y estado del mint añadido desde backend
        console.log('User desde fetch: ',responseJson.user);
        //let newItems = [{authenticated: true, user: responseJson.user}]
        //setUserstate(prevItems => [...prevItems, ...{authenticated: true, user: responseJson.user}]);
        setUserstate({...userstate, authenticated: true, user: responseJson.user});
        responseJson.user.isMinting ? setIsMinting(true) : setIsMinting(false);
        if (responseJson.user.nftData?.metadata) {
          console.log('Setting mintdata: ', responseJson.user.nftData);
          setMintData({nft: responseJson.user.nftData});
          
        }
        setHasLoaded(true);
    })
    .catch(error => {
        //console.log('fetch error: ', error)
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
    //console.log('Tx', tx);
    //const nft = await checkMintedNft(tx);
    //console.log('NFT status recibido en front: ', nft)
  }
  const infoPanelRef = useRef();

  // Scrollear con el infopanel si está muy abajo
  if (infoPanelRef.current && (isConnected || isCorrectNetwork || isMinting || mintData.nft)) {
    //console.log('InfoPanelRef: ', infoPanelRef.current)
    infoPanelRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  // Navbar fija no me va bootstrap;

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
            <div className="st-content-inner" style={{backgroundColor: "#fff"}}>
              <NavBar navbarRef={navbarRef}/>
              <div className="content">
                < ProjectBanner />       
                <section className="slice sct-color-2 border-bottom" style={{backgroundColor: "#f1f1f1", boxShadow: "rgb(0 0 0 / 13%) 0px 4px 32px 10px"}}>
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