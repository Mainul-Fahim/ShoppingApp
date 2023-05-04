const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header. 
 
  const token = req.header('x-auth-token');
   // middleware function is used and it has access to resquest response cycle.
  // And next is used as a callback that runs once it is done and it moves to the part of the function.
  // getting the token from the header.

  // Check if not token
  if (!token) {
    return res.status(401).send({ msg: 'No token, authorization denied' });
  }
  // if token is not there then throw unauthorized

  // Verify token if it is there
  // verify takes two things token and secret key from config file
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).send({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).send({ msg: 'Server Error' });
  }
};
// catch will show if token is invalid.
