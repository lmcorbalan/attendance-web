import React from 'react';

import PlayerCard from '../Card';
// import players from '../players';

import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_ALL_PLAYERS = gql`
  query getAllPlayers {
    allPlayers {
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
        session {
          id
          place
          date
          type
        }
        type
      }
      createdAt
      updatedAt
    }
  }
`;

const PlayersList = () => (
  <Query query={GET_ALL_PLAYERS}>
      {({ loading, error, data }) => {

        console.log(loading, error, data)

        if (error) return <div>Error!!</div>
        if (loading || !data) return <div>...loading</div>

        console.log(data);

        return data.allPlayers.map(player => {
          return (
            <PlayerCard key={player.id} player={player} />
          )
        });
      }}
  </Query>
);

export default PlayersList;
