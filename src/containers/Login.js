import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { submitEmail, enterEmail } from '../actions/login'
import CustomInput from '../components/CustomInput'

import WithStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { orange } from '@material-ui/core/colors';

class Login extends Component{
  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.body}>
        <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="stretch"
        alignContent="center"
        justify="center">
        <Grid item>
          <Typography variant="h4" align="center">studybox.io</Typography>
        </Grid>
          <Grid item className={classes.container}>
            <CustomInput label="Your email address" />
          </Grid>
          <Grid item className={classes.container}>
          <Button className={classes._button} variant="contained" color="primary" size="large" fullWidth>
              Next
          </Button>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

const styles = ({
  body: {
    marginTop: 50,
  },
  _button: {
    marginTop: 10,
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  },
  container: {
    maxWidth: 500, 
  }
});

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

function mapStateToProps(store, props) {
  return {store,props}
}

function mapDispatchToProps(dispatch) {
  return Object.assign({}, bindActionCreators({ submitEmail, enterEmail }, dispatch))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithStyles(styles)(Login))