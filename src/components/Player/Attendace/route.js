import React from 'react';
import PlayersAttendace from './index';

import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const PlayersList = ({
  match: {
    params: { sessionId }
  }
}) => {
  return <PlayersAttendace sessionId={sessionId} />;
};

export default PlayersList;
