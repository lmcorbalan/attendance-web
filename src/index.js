import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "/graphql"
});

const ApolledApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<ApolledApp />, document.getElementById('root'));
registerServiceWorker();

// import gql from "graphql-tag";
//
// const GET_ALL_PLAYERS = gql`
//   query getAllPlayers {
//     allPlayers {
//       id
//       name
//       lastname
//       birthDate
//       positions
//       phoneNumber
//       email
//       photo
//       attendances {
//         id
//         session {
//           id
//           place
//           date
//           type
//         }
//         type
//       }
//       createdAt
//       updatedAt
//     }
//   }
// `;
//
// const client = new ApolloClient({
//   uri: "/graphql"
// });
//
// client
//   .query({ query: GET_ALL_PLAYERS })
//   .then(result => console.log(result));
