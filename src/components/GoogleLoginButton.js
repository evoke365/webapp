import React, { useEffect, useRef, useCallback } from 'react';
import { styled } from '@mui/material/styles';

const GoogleButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px',
});

const GoogleLoginButton = ({ onSuccess, onError, clientId }) => {
  const googleButtonRef = useRef(null);

  const handleCredentialResponse = useCallback((response) => {
    try {
      // Decode the JWT token to get user info
      const decoded = JSON.parse(atob(response.credential.split('.')[1]));
      
      const userInfo = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        token: response.credential,
      };

      onSuccess(userInfo);
    } catch (error) {
      console.error('Error parsing Google credential:', error);
      onError(error);
    }
  }, [onSuccess, onError]);

  useEffect(() => {
    if (window.google && clientId) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
        }
      );
    }
  }, [clientId, handleCredentialResponse]);

  return (
    <GoogleButtonContainer>
      <div ref={googleButtonRef}></div>
    </GoogleButtonContainer>
  );
};

export default GoogleLoginButton;