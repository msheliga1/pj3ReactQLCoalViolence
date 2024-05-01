// MJS 4.18.24 - SERVER File from starter code. Words with REST api. 
// Need to mod to use with GraphQL.  NOT part of Act 28-MP. Used Act 24 jwt. 
// Next line from Act 21-24. server/util/auth. 
const { GraphQLError } = require('graphql');  // mod not found err
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes. From starter code. 
  // Got this from Act 26. Graph QL (non rest) version. 
  // We also need to modify client/src/utils/auth (possibly) and App.js. 
  // Note that a req is passed in as well as returned. The returned, possibly moded req becomes 
  // the "context" in resolver methods.  Very confusing, but this is how it works. 
  authMiddleware: function ({ req }) {
    // console.log('MJS: Starting authMiddleware GQL version');
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {  // get rid of word Bearer
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      // console.log("No token found in AuthMiddleware (GQL version)"); 
      return req;
    }
    console.log("SERVER auth.js authMiddleware found token: ", token); 
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;  // add user to req (which is returned) => bcomes context for resolvers s
    } catch {
      console.log('MJS: Invalid token');
    }
    return req;
  },  // end authMiddleware (GQL version)

  // function for our authenticated routes. From starter code. (REST versrion)
  authMiddlewareRest: function (req, res, next) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      return res.status(400).json({ message: 'MJS You have no token!' });
    }
    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }
    // send to next endpoint
    next();
  }, // end AuthMiddleware method - Not needed if using GraphQL   

  // next funct from Act21-24 
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: { code: 'UNAUTHENTICATED', },
  }), 

  // signToken seems identical to Act21-24
  // Per TA Mike, this will sign the toen and provide the token. 
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
