import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-console.error';
import './style.css';
import App from './App';


const errorLink = onError(({ graphQLErrors, networkError }) => {
    if(graphQLErrors) {
        // you can do something with graphql error
    }
    if(networkError) {
        // you can do something with network error
    }
})

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
    uri: GITHUB_BASE_URL,
    headers: {
      authorization: `Bearer ${
          process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
      }`
    }
});

const link = ApolloLink.from([errorLink, httpLink]);


const cache = new InMemoryCache();

const client = new ApolloClient({
    link,
    cache,
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);