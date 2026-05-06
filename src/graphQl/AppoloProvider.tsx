import React, { ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, HttpLink, Operation } from '@apollo/client';

/**
 * Function to check if the user is authenticated.
 * This example checks if an authentication token is stored in localStorage.
 *
 * @returns True if the user is authenticated, false otherwise.
 */
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  return Boolean(token);
};

/**
 * Function to retrieve the authentication token from localStorage.
 *
 * @returns The authentication token as a string, or null if not found.
 */
const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem('authToken'); // Retrieve the token from localStorage
  } catch (err) {
    console.error('Error retrieving auth token:', err);
    return null;
  }
};

/**
 * Middleware link that adds the appropriate URI and token based on authentication status.
 */
const authLink = new ApolloLink((operation: Operation, forward) => {
  const token = getAuthToken(); // Get the token from storage

  // Set headers and URI for the request
  operation.setContext(({ headers }: any) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '', // Attach the token if it exists
    },
  }));

  return forward ? forward(operation) : null; // Continue with the request
});

// Create an HttpLink for actual network requests
const httpLink = new HttpLink({
  uri: isAuthenticated()
    ? 'http://localhost:4001/api/v1/protected/graphql' // Protected GraphQL route
    : 'http://localhost:4001/api/v1/graphql', // Unprotected GraphQL route
});

// Combine authLink and httpLink
const link = ApolloLink.from([authLink, httpLink]);

// Create the Apollo Client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

/**
 * Props for the ApolloProviderWrapper component.
 */
interface ApolloProviderWrapperProps {
  children: ReactNode; // Children components to be wrapped by ApolloProvider
}

/**
 * ApolloProviderWrapper component that provides the Apollo Client to its children.
 *
 * @param props - The props for the component.
 * @returns The ApolloProvider component wrapping the children.
 */
const ApolloProviderWrapper: React.FC<ApolloProviderWrapperProps> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

export default ApolloProviderWrapper;