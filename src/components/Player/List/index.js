import React from 'react';

import PlayerCard from '../Card';

const playersInfo = [
  {
    id: 1,
    name: 'Jugador 1',
    image:
      'https://pbs.twimg.com/profile_images/378800000008709225/2f399df71f2764336c2348a6d23efbe8_400x400.jpeg'
  },
  {
    id: 2,
    name: 'Jugador 2',
    image:
      'https://pbs.twimg.com/profile_images/378800000008709225/2f399df71f2764336c2348a6d23efbe8_400x400.jpeg'
  },
  {
    id: 3,
    name: 'Jugador 3',
    image:
      'https://pbs.twimg.com/profile_images/378800000008709225/2f399df71f2764336c2348a6d23efbe8_400x400.jpeg'
  },
  {
    id: 4,
    name: 'Jugador 4',
    image:
      'https://pbs.twimg.com/profile_images/378800000008709225/2f399df71f2764336c2348a6d23efbe8_400x400.jpeg'
  }
];

const PlayersList = () => {
  return playersInfo.map(player => {
    return (
      <PlayerCard key={player.id} player={player} />
    )
  });
};

export default PlayersList;
