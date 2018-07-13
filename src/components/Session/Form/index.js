import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

import moment from 'moment';
import 'moment/locale/es';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class SessionForm extends Component {
  state = {
    type: 'HIGH',
    place: 'LOCAL',
    selectedDate: new Date(),
    open: true,
  };

  handleChange = name => event => {
    console.log(name, event.target.value)
    this.setState({
      [name]: event.target.value,
    });
  };

  handleDateChange = (date) => {
    console.log(date)
    this.setState({ selectedDate: date });
  }

  // id
  // place
  // date
  // type

  render() {
    const { classes, open } = this.props;
    const { selectedDate } = this.state;

    const typeDictionary = [
      { value: 'HIGH', label: 'Alta' },
      { value: 'LOW', label: 'Baja' },
      { value: 'MIDDLE', label: 'Media' },
      { value: 'MATCH', label: 'Partido' }
    ];

    const placeDictionary = [
      { value: 'LOCAL', label: 'Local' },
      { value: 'VISITOR', label: 'Visitante' },
      { value: 'PARK', label: 'Parque' },
      { value: 'CLUB', label: 'Club' }
    ];

    return (
      <MuiPickersUtilsProvider
        utils={MomentUtils}
        moment={moment}
        locale="es"
      >
      <div>
        <Dialog
          open={open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Estimulo</DialogTitle>
          <DialogContent>
            <TextField
              id="select-type"
              select
              label="Intensidad"
              className={classes.textField}
              value={this.state.type}
              onChange={this.handleChange('type')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {typeDictionary.map(type => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="select-place"
              select
              label="Lugar"
              className={classes.textField}
              value={this.state.place}
              onChange={this.handleChange('place')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {placeDictionary.map(place => (
                <MenuItem key={place.value} value={place.value}>
                  {place.label}
                </MenuItem>
              ))}
            </TextField>
            <DateTimePicker
              className={classes.textField}
              value={selectedDate}
              onChange={this.handleDateChange}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.props.handleClose} color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles)(SessionForm);
