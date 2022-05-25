import React from 'react'
import App from './App'
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split} from '@apollo/client'
import { ApolloLink, from } from "@apollo/client/link/core"
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';


const webServerURL = process.env.REACT_APP_URI
const subscriptionServerURL = process.env.REACT_APP_SUBSCRIPTIONS


const httpLink = new HttpLink({
    uri: webServerURL,
})

const wsLink = new WebSocketLink({
  uri: subscriptionServerURL,
  options: {
    reconnect: true,
    minTimeout: 3000,
    connectionParams: {
      token: `Bearer ${localStorage.getItem('jwtToken')}`
   }
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(() => ({
      headers: {
          authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
  }))
  return forward(operation)
})

const client = new ApolloClient({
    link: from([authLink, splitLink]),
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)