import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import PlayersList from './components/Player/List';
import PlayersAttendaceRoute from './components/Player/Attendace/route';

const FourOhFour = () => <h1>404</h1>;

const styles = theme => ({
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  'content-left': {
    marginLeft: -240
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  'contentShift-left': {
    marginLeft: 0
  }
});

const Router = props => {
  const { classes, theme, open } = props;

  return (
    <BrowserRouter>
      <main
        className={classNames(classes.content, classes['content-left'], {
          [classes.contentShift]: open,
          [classes['contentShift-left']]: open
        })}
      >
        <div className={classes.contentHeader} />
        <Switch>
          <Route exact path="/" component={PlayersList} />
          <Route exact path="/attendace/:sessionId" component={PlayersAttendaceRoute} />
          <Route component={FourOhFour} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

Router.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired
};

export default withStyles(styles, { withTheme: true })(Router);
