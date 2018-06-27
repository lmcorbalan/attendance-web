import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';

import players from '../players';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
  },
  avatar: {
    margin: 10
  }
});

const attendanceOptions = ['SI', 'NO', 'DIF', 'SAF'];

class PlayersAttendace extends Component {
  state = {
    players: players
  };

  handleChange = (playerId, sessionId, selectedOption) => event => {
    const players = this.state.players;
    const newAttendace = attendanceOptions.reduce((acc, option) => {
      acc[option] = option === selectedOption ? event.target.checked : false;

      return acc;
    }, {});

    players[playerId].attendace[sessionId] = newAttendace;
    this.setState({players: players});
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Jugador</TableCell>
              {attendanceOptions.map(option => <TableCell key={`header-${option}`}>{option}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.players.map(player => {
              return (
                <TableRow key={player.id}>
                  <TableCell>
                    <Avatar
                      alt={player.name}
                      src={player.image}
                      className={classes.avatar}
                    />
                  </TableCell>
                  <TableCell>{player.name}</TableCell>
                  {attendanceOptions.map(option => {
                    const session = 1; // TODO: this will be the session id
                    const checked = player.attendace[session][option];
                    const cellKey = `${player.id}-${option}`;
                    console.log(cellKey)
                    return (
                      <TableCell key={cellKey}>
                        <Switch
                          checked={checked}
                          onChange={this.handleChange(player.id, session, option)}
                          value={option}
                          color="primary"
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

PlayersAttendace.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlayersAttendace);
