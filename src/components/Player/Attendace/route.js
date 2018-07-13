import React from 'react';
import PlayersAttendace from './index';

const PlayersList = ({
  match: {
    params: { sessionId }
  }
}) => {
  return <PlayersAttendace sessionId={sessionId} />;
};

export default PlayersList;
