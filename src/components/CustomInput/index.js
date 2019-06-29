import React from 'react';
import PropTypes from 'prop-types';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CustomInput = ({label}) => (
    <MuiThemeProvider theme={theme}>
        <TextField
            id="standard-dense"
            label={label}
            margin="dense"
        />
    </MuiThemeProvider>
)

CustomInput.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
}

const theme = createMuiTheme({
    overrides: {
      MuiInput: {
        root: {
          fontSize: 20,
          width: 500,
        },
        underline: {
          '&:before': { //underline color when textfield is inactive
            borderBottom:'1px solid orange',
          },
          '&:hover:not($disabled):before': { //underline color when hovered 
            borderBottom: '2px solid orange',
          },
          '&:after': { //underline color when selected 
            borderBottom: '2px solid orange',
          },
        },
      },
      MuiInputLabel: { 
        root: {
          fontSize: 20, 
          "&$focused": {
            color: 'rgba(0, 0, 0, 0.54)',
          },
        },
      },
    }
});

export default CustomInput