import React from 'react';
import { APP_NAME } from '../../config'
import { styled } from '@mui/material/styles'

const Header = styled('div')({
  textAlign: 'center',
});

const Logo = styled('p')({
  minHeight: '55px',
  fontSize: '2em',
  fontWeight: '300',
  fontStyle: 'italic',
  color: 'rgb(251, 167, 59)',
  marginLeft: '10px',
});

const LogoContainer = () => (
  <Header>
    <Logo>{APP_NAME}</Logo>
  </Header>
)

export default LogoContainer