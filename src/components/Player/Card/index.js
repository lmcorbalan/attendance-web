import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme =>({
  root: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: theme.spacing.unit * 3
  },
  card: {
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

function PlayerCard(props) {
  const { classes, player } = props;
  const playerFullName = `${player.lastname}, ${player.name}`;
  const cardTitle = `Foto de ${playerFullName}`;

  const defaultImage = 'https://pbs.twimg.com/profile_images/378800000008709225/2f399df71f2764336c2348a6d23efbe8_400x400.jpeg';

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={player.image || defaultImage}
          title={cardTitle}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {playerFullName}
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

PlayerCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerCard);
