import React from 'react';
import './GoogleLog.css'
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../../../utils/refreshToken';

//const clientId = '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';
const clientId = '729410394459-015l5t3cqthm3tbk0eut2njbk6a3pk7t.apps.googleusercontent.com';

export default function GoogleLog({ googleDetails, setGoogleDetails, setLoggedIn, connectedUsers, setConnectedUsers }) {

  const onSuccess = (res) => {
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
    <div className="googlelog">
      <div className="googlelog__background"></div>
      {/* <div><h1>yoel</h1></div> */}
      <div className="googlelog__content">
        {googleLogin}
        {/* <button className="googlelog__username_login" onClick={toggle}>Login with username</button> */}
      </div>
    </div>
  );
}
