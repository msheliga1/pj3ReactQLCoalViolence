// MJS 4.18.24 - File from starter code. Words with REST api. 
// Need to mod to use with GraphQL.  NOT part of Act 28-MP. Used Act 24 jwt. 
// Next line from Act 21-24. server/util/auth. 
// const { GraphQLError } = require('graphql');  // mod not found err

const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes. From starter code. 
 /* authMiddleware: function (req, res, next) {
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
  }, // end AuthMiddleware method  */ 
  // next funct from Act21-24 
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: { code: 'UNAUTHENTICATED', },
  }), 
  // signToken seems idential to Act21-24
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
