import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import SessionForm from '../Form';

import { Link } from 'react-router-dom';

import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {},
  button: {
    margin: theme.spacing.unit
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.unit * 2
  }
});

const GET_ALL_SESSIONS = gql`
  query allSessions {
    sessions: allSessions {
      id
      place
      date
      type
    }
    SESSION_TYPE: __type(name: "SessionType") {
      enumValues {
        name
      }
    }
    SESSION_PLACE: __type(name: "SessionPlace") {
      enumValues {
        name
      }
    }
  }
`;

const AttendaceLink = props => (
  <Link to={`/attendance/${props.session.id}`} {...props} />
);

class SessionList extends Component {
  state = {
    isFormOpen: false
  };

  handleOpenForm = () => {
    this.setState({ isFormOpen: true })
  };

  handleCloseForm = () => {
    this.setState({ isFormOpen: false })
  };

  render() {
    const { classes } = this.props;

    return (
      <Query query={GET_ALL_SESSIONS}>
        {({ loading, error, data }) => {
          if (error) return <div>Error!!</div>;
          if (loading || !data) return <div>...loading</div>;

          const { SESSION_PLACE, SESSION_TYPE, sessions } = data;

          return (
            <React.Fragment>
              <Button variant="fab" color="primary" aria-label="add" className={classes.fab} onClick={this.handleOpenForm}>
                <AddIcon />
              </Button>
              <Paper className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Lugar</TableCell>
                      <TableCell>Intensidad</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sessions.map(session => {
                      return (
                        <TableRow key={session.id}>
                          <TableCell>{session.date}</TableCell>
                          <TableCell>{session.place}</TableCell>
                          <TableCell>{session.type}</TableCell>
                          <TableCell>
                            <Button
                              color="primary"
                              className={classes.button}
                              component={AttendaceLink}
                              session={session}
                            >
                              Asistencia
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
              <SessionForm open={this.state.isFormOpen} handleClose={this.handleCloseForm} />
            </React.Fragment>
          )
        }}
      </Query>
    );
  }
};

export default withStyles(styles)(SessionList);
