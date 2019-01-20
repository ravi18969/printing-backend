const logger = require('../config/winston');

module.exports = function(err, req, res, next){
  console.log("Calling error handling function...");
  // winston.error(err.message, err);

  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(500).send('Something failed.');
};