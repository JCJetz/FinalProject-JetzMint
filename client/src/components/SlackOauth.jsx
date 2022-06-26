//import PropTypes from "prop-types";
import '../App.css';
import { FaCheckCircle,FaRegCircle } from "react-icons/fa";
//import {VscDebugDisconnect} from "react-icons/vsc";
import {CgLogOff} from "react-icons/cg";

function SlackOauth (props) {

  console.log('render slackoauth')

  /* props obligatorias y su type (guardo por si más adelante me hace falta)

  static propTypes = {
    authenticated: PropTypes.bool.isRequired
  };
  */

  function _handleSignInClick (event) {
    // Authenticate using passport api in the backend
    // Open Slack login page
    // Send a cookie back with user data
    event.preventDefault();
    window.open("/api/auth/slack", "_self");
  };

  function _handleLogoutClick () {
    window.open("/api/auth/logout", "_self");
  };
  
  


  return (
    <>
    {!props?.authenticated ? (
      <div className="card no-border" id="step-wallet">
        <div className="card-body border-bottom p-3">
          <div className="row align-items-center mx-n3">
            <div className="col-6">
              <div className="heading heading-5 mb-0">
                <i className="far fa-fw alpha-3 mr-2"><FaRegCircle /></i>  Validar Slack
              </div>
            </div>
            <div className="col-6 text-center">
              <button onClick={_handleSignInClick} className="btn btn-slack btn-lg btn-icon-left bg-success c-white btn-circle">  Connectar Slack</button>
            </div>

          </div>
          
        </div>
      </div>
    ) : ( 
      <>
      <div className="card no-border" style={{background: "#F0FFF0"}} id="step-wallet">
        <div className="card-body border-bottom p-3">
          <div className="row align-items-center mx-n3">
            <div className="col-4">
              <div className="heading heading-5 mb-0 text-success">
                <i className="fas fa-fw text-success mr-2"><FaCheckCircle /></i>  Slack
              </div>
            </div>
            <div className="col-8 text-end mediacolumn">
              <span className="badge badge-pill badge-lg text-md strong bg-white c- text-wrap text-left z-depth-1-top btn-circle text-lowercase marginright" style={{color:"#55595c"}}>
                {props?.userstate?.user?.name}
              </span>
              <span className="badge badge-pill badge-lg text-md strong bg-white c- text-wrap text-left z-depth-1-top btn-circle text-lowercase marginright" style={{color:"#55595c"}}>
                {props?.userstate?.user?.slackId}
              </span>
              <span className="badge-pic text-md strong bg-white c- text-wrap text-left z-depth-1-top btn-circle text-lowercase marginright" style={{color:"#55595c"}}>
                <img src={`${props?.userstate?.user?.profileImageUrl}`} width="30" alt="slackimage" style={{borderRadius: "50%"}}/> 
              </span>
              {/* tooltip no funciona :(
              */
              }
              <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Disabled tooltip">
                <button onClick={_handleLogoutClick} type="button" className="btn btn-danger logoffbutton">
                <CgLogOff />
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>  
    </>
      
    )}
    </>
    
    
  );
}

export default SlackOauth;