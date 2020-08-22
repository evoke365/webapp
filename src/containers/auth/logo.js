import React from 'react';
import PropTypes from 'prop-types';
import { APP_NAME } from '../../config'
import { withStyles } from '@material-ui/core/styles'

const LogoContainer = ({ classes }) => (
  <div className={classes.header}>
    <p className={classes.logo}>{APP_NAME}</p>
  </div>
)

LogoContainer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
}

const style = theme => ({
  header: {
    textAlign: 'center',
  },
  logo: {
    minHeight: '55px',
    fontSize: '2em',
    fontWeight: '300',
    fontStyle: 'italic',
    color: 'rgb(251, 167, 59)',
    marginLeft: '10px',
  },
})

export default withStyles(style)(LogoContainer)