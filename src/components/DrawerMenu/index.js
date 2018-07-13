import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'

import ListItemLink from './ListItemLink';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
  }
});

const DrawerMenu = props => {
  const { classes, theme, open } = props;

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={props.handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <div className={classes.lists}>
        <List>
          <ListItemLink to="/session" primary="Estimulos" icon={<FitnessCenterIcon />} />
          <ListItemLink to="/player" primary="Jugadores" icon={<DirectionsRunIcon />} />
        </List>
      </div>
      <Divider />
    </Drawer>
  );
};

DrawerMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(DrawerMenu);
