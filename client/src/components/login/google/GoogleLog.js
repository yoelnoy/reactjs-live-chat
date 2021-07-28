import React from 'react';
import './GoogleLog.css'
import { GoogleLogin } from 'react-google-login';
import Logo from '../../../utils/media/live-chat-logo.png'
import { FaReact } from 'react-icons/fa';
import { FaNode } from 'react-icons/fa';
import { SiSocketDotIo } from 'react-icons/si';
import { SiMaterialUi } from 'react-icons/si';

// refresh token
import { refreshTokenSetup } from '../../../utils/refreshToken';

const clientId = '729410394459-015l5t3cqthm3tbk0eut2njbk6a3pk7t.apps.googleusercontent.com';

export default function GoogleLog({ googleDetails, setGoogleDetails, setLoggedIn, connectedUsers, setConnectedUsers }) {

  const onSuccess = (res) => {
    console.log("res" + res);
    setGoogleDetails([...googleDetails, res.profileObj])
    setConnectedUsers([...connectedUsers, res.profileObj])
    setLoggedIn(true)
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  const googleLogin = (
    <GoogleLogin
      className="googleLogin__lgoogle_button"
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  )

  return (
    <div className="googleLogin-container">
      

        <div className="googleLogin__left">
          <img src={Logo} alt="" className="googleLogin__img"/>
        </div>
        
        <div className="googleLogin__right">
          <div className="googleLogin__content">
            
            <h2 className="googleLogin__right-title">Sign In</h2>
            {googleLogin}
            <div className="googleLogin__right-text">
              <h3 className="googleLogin__right-text-h3">
                Live chat application allows to send instant live messages between users.
              </h3>

              <h3 className="googleLogin__right-text-h3">
                This project was develpoed with React.js on the front end and Node.js 
                on the back end. 
                Using Socket.io, i was able to creat realtime, bi-directional 
                communication between web clients and servers.
              </h3>
            </div>
            
            <div className="googleLogin__icons">
              <FaReact className="icon"/>
              <FaNode className="icon"/>
              <SiSocketDotIo className="icon"/>
              <SiMaterialUi className="icon"/>
            </div>

          </div>

          <h5 className="googleLog__fotter">
              Developed and designed by <a target="_blank" href="https://www.linkedin.com/in/yoelnoy/" >Yoel Noy</a>
          </h5>

      </div>

    </div>
    
  );
}