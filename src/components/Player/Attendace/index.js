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

import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {},
  avatar: {
    margin: 10
  }
});

const GET_ALL_PLAYERS = gql`
  query getAllPlayers {
    ATTENDANCE_TYPES: __type(name: "AttendanceType") {
      enumValues {
        name
      }
    }
    players: allPlayers {
      id
      name
      lastname
      birthDate
      positions
      phoneNumber
      email
      photo
      attendances {
        id
        type
        session {
          id
        }
      }
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_ATTENDACE = gql`
  mutation updateAttendace($playerId: ID!, $input: UpdatedAttendance!) {
    updateAttendace(playerId: $playerId, input: $input) {
      id
      attendances {
        id
        type
        session {
          id
        }
      }
    }
  }
`;

class PlayersAttendance extends Component {
  getAttendanceStateByType(ATTENDANCE_TYPES, initialType = '') {
    return ATTENDANCE_TYPES.enumValues.reduce((acc, type) => {
      return {
        ...acc,
        [type.name]: type.name === initialType
      };
    }, {});
  }

  render() {
    const { classes, sessionId } = this.props;

    return (
      <Query query={GET_ALL_PLAYERS}>
        {({ loading, error, data }) => {
          if (error) return <div>Error!!</div>;
          if (loading || !data) return <div>...loading</div>;

          const { ATTENDANCE_TYPES, players } = data;
          const playersAttendance = players.reduce((acc, player) => {
            // FIX - no attendance when it's a new session
            const attendance = player.attendances.find(
              attendace => attendace.session.id === sessionId
            );
            const type = attendance.type;

            acc[player.id] = {
              attendaceId: attendance.id,
              ...this.getAttendanceStateByType(ATTENDANCE_TYPES, type)
            };

            return acc;
          }, {});

          return (
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Jugador</TableCell>
                    {ATTENDANCE_TYPES.enumValues.map(type => (
                      <TableCell key={`header-${type.name}`}>
                        {type.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {players.map(player => {
                    return (
                      <Mutation mutation={UPDATE_ATTENDACE} key={player.id}>
                        {updateAttendace => {
                          return (
                            <TableRow>
                              <TableCell>
                                <Avatar
                                  alt={player.name}
                                  src={player.image}
                                  className={classes.avatar}
                                />
                              </TableCell>
                              <TableCell>{player.name}</TableCell>
                              {ATTENDANCE_TYPES.enumValues.map(type => {
                                const cellKey = `${player.id}-${type.name}`;

                                return (
                                  <TableCell key={cellKey}>
                                    <Switch
                                      checked={
                                        playersAttendance[player.id][type.name]
                                      }
                                      onChange={event => {
                                        event.preventDefault();
                                        updateAttendace({
                                          variables: {
                                            playerId: player.id,
                                            input: {
                                              id:
                                                playersAttendance[player.id]
                                                  .attendaceId,
                                              type: event.target.value
                                            }
                                          }
                                        });
                                      }}
                                      value={type.name}
                                      color="primary"
                                    />
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        }}
                      </Mutation>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          );
        }}
      </Query>
    );
  }
}

PlayersAttendance.propTypes = {
  classes: PropTypes.object.isRequired,
  sessionId: PropTypes.string.isRequired
};

export default withStyles(styles)(PlayersAttendance);
