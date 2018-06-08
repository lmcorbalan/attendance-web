import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  'appBarShift-left': {
    marginLeft: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  }
});

const Header = props => {
  const { classes, theme, open } = props;

  return (
    <AppBar
      className={classNames(classes.appBar, {
        [classes.appBarShift]: open,
        [classes['appBarShift-left']]: open
      })}
    >
      <Toolbar disableGutters={!open}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          className={classNames(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" noWrap>
          PS Loga
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(Header);
