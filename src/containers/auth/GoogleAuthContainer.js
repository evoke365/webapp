import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import GoogleLoginButton from '../../components/GoogleLoginButton';
import LogoContainer from './logo';
import { useGoogleLoginMutation } from '../../store/authSlice';
import { setCredentials } from '../../store/authSlice';
import { saveState, loadState } from '../../localStorage';

const Container = styled('div')(({ theme }) => ({
  marginRight: 'auto',
  marginLeft: 'auto',
  maxWidth: '1024px',
  paddingTop: '10%',
}));

const Heading = styled('div')({
  fontSize: '1.2em',
  color: '#000000',
  textAlign: 'center',
});

const Body = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ErrorMessage = styled('div')({
  color: 'red',
  textAlign: 'center',
  marginTop: '20px',
});

// You'll need to get this from Google Cloud Console
const GOOGLE_CLIENT_ID = "942582519364-gn4puh22ulc8o1tceaog16m19gi54p3q.apps.googleusercontent.com";

const GoogleAuthContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleLogin, { isLoading, error }] = useGoogleLoginMutation();

  useEffect(() => {
    // Check if user is already authenticated
    const token = loadState("token");
    const user = loadState("user");
    
    if (token && user) {
      dispatch(setCredentials({ user, token }));
      navigate('/home');
    }
  }, [dispatch, navigate]);

  const handleGoogleSuccess = async (googleUserInfo) => {
    try {
      const result = await googleLogin(googleUserInfo).unwrap();
      
      // Save credentials to localStorage and Redux store
      saveState('token', result.token);
      saveState('email', result.user.email);
      saveState('user', result.user);
      
      dispatch(setCredentials({
        user: result.user,
        token: result.token,
      }));
      
      // Navigate to home page
      navigate('/home');
    } catch (err) {
      console.error('Google login failed:', err);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google Sign-In error:', error);
  };

  return (
    <Container>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <div>
          <LogoContainer />
          <Heading>
            <p>remember everything</p>
          </Heading>
        </div>
      </Slide>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Body>
          <Grid container>
            <Grid item xs={12}>
              <div style={{ textAlign: 'center' }}>
                <h3>Sign in with Google</h3>
                <GoogleLoginButton
                  clientId={GOOGLE_CLIENT_ID}
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                />
                {isLoading && <p>Signing you in...</p>}
                {error && (
                  <ErrorMessage>
                    {error.data?.message || 'Login failed. Please try again.'}
                  </ErrorMessage>
                )}
              </div>
            </Grid>
          </Grid>
        </Body>
      </Slide>
    </Container>
  );
};

export default GoogleAuthContainer;