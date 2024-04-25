const express = require('express');
// Uncomment the following code once you have built the queries and mutations 
// in the client folder
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');  // needed for new context GQL middleware

// Uncomment the following code once you have built 
// the queries and mutations in the client folder
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// Comment out this code once you have built out queries and mutations in the client folder
// const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();
// Uncomment the following code once you have built the queries and mutations in the client folder
const server = new ApolloServer({
   typeDefs,
   resolvers,
});

// Uncomment the following code once you have built the queries and mutations in the client folder
const startApolloServer = async () => {
   await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  // Uncomment the following code once you have built the queries and mutations in the client folder
  // Needs updated for context likley.
  // app.use('/graphql', expressMiddleware(server));
  app.use('/graphql', expressMiddleware(server, { context: authMiddleware }) );

  // Comment out this code once you have built out queries and mutations in the client folder
  // app.use(routes);

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    // Uncomment this code once you have built out queries and mutations in the client folder
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
     });
  } // closes if (process.env.NODE_ENV === 'production') condition

// Uncomment this code once you have built out queries and mutations in the client folder
   db.once('open', () => {
     app.listen(PORT, () => {
       console.log(`The app should be running on port 3000, at least npm run develop`);
       console.log(`API server running on port ${PORT}!`);
       console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
     });
   });
 }; // end startApolloServer

// Comment out this code once you have built out queries and mutations in the client folder
// db.once('open', () => {
//   app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`));
// });

// Uncomment the following code once you have built the queries and mutations in the client folder
startApolloServer();
