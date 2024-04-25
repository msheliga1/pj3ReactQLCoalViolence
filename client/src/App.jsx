import './App.css';

import Navbar from './components/Navbar';
// Andrew said also need to update server.js file.  Use App 26. L27-29, L12 different.  Line 17 should be gone. 
// Line 27 missing, also 34-36 
// ------------------- From App 26 here down,  ----------- 
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink,} from '@apollo/client'; 
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

// import Header from './components/Header';
// import Footer from './components/Footer';

// Construct our main GraphQL API endpoint. 
// Per Andrew, dont use entire path, or could get dreaded CORS error. 
const httpLink = createHttpLink({
  uri: '/graphql',  
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
// This is called by new ApolloClient (which is below). 
const authLink = setContext((_, { headers }) => {
  console.log("App.jsx setContext starting ... "); 
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  console.log("App.jsx setContext token: ", token); 
  console.log("App.jsx setContext headers: ", headers); 
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
// http Link likely /graphql 
const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache(),
});
// console.log("App.jsx Client link ", client);  /// doesnt print 

// Got rid of Header and Footer from Act21-26. Replaced Header with Navbar 
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
      <Navbar />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </ApolloProvider>
  );
} // end App()

export default App;
