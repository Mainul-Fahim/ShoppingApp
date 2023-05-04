const mongoose = require('mongoose');
// middleware to check for a valid object id
const checkObjectId = (idToCheck) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(400).json({ msg: 'Invalid ID' });
  next();
};
//if objectId is not valid then resond with 400 status code as bad request
// next is used to check the object id in database 

module.exports = checkObjectId;
