
// const winston = require('winston');
// require('winston-mongodb');
// // require('express-async-errors');

// module.exports = function() {
//   winston.handleExceptions(
//     new winston.transports.File({ filename: `${appRoot}/logs/uncaughtExceptions.log` }));
  
//   process.on('unhandledRejection', (ex) => {
//     throw ex;
//   });
  
//   winston.add(winston.transports.File, { filename: `${appRoot}/logs/error.log` });
//   winston.add(winston.transports.MongoDB, { 
//     db: 'mongodb://localhost:27017/restapi',
//     level: 'info'
//   });  
// };

let winston = require('winston');
require("winston-daily-rotate-file");
const fs = require('fs');
const logDir = 'log';
 
const tsFormat = () => (new Date()).toLocaleTimeString();

let options = {
  file: {
    level: 'error',
    filename: `${logDir}/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  dailyRotateFile: {
    filename: `${logDir}/system.log`,
    timestamp: tsFormat,
    datePattern: 'yyyy-MM-dd',
    prepend: true,
    level: 'error'
  }  
};
 
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
 
winston = winston.createLogger({
  transports: [
    // colorize the output to the console and add timestamp
    new (winston.transports.Console)(options.console),
 
    // it will create log file named 'results.log' in log folder
     new (winston.transports.File)(options.file),
  
    // it will create date wise logfile like 2018-02-04-results.log
     new (require('winston-daily-rotate-file'))(options.dailyRotateFile)
  ]
});
module.exports = winston;  