require("express-async-errors");
const express = require("express");
const app = express();
require("dotenv").config();
const error = require("./middleware/error");
// const confi = require("config");
const winston = require('./config/winston');
const morgan = require('morgan');
// const winston = require("winston");
const appDebug = require("debug")("app:startup");
const dbDebug = require("debug")("app:db");
const User = require("./models/users");
const Product = require("./models/products");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const Cors = require("cors");
const helmet = require("helmet");
// const csp = require("express-csp-header");
const Auth = require("./routes/auth");
const Products = require("./routes/products");
const Fabrications = require("./routes/fabrications");

// const winston = require('winston');
// require('winston-mongodb');
// require('express-async-errors');
  
// winston.add(winston.transports.File, { filename: 'testerror.log' });
// winston.log('info', 'Hello distributed log files!');
// winston.info('Hello again distributed logs');
  

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/restapi", {
    useNewUrlParser:true
})
.then(() => {
    dbDebug("Database connected..");
})
.catch(err => {
    dbDebug(err);
});


// const cspMiddleware = csp({
//     policies: {
//       'default-src': [csp.NONE],
//       'script-src': [csp.NONCE],
//       'style-src': [csp.NONCE],
//       'img-src': [csp.SELF],
//       'font-src': [csp.NONCE, 'fonts.gstatic.com'],
//       'object-src': [csp.NONE],
//       'block-all-mixed-content': true,
//       'frame-ancestors': [csp.NONE]
//     }
// });


// app.set('trust proxy', 1); // trust first proxy

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(helmet());
// app.use(cspMiddleware);
app.use(Cors());
// app.use(morgan('combined', {stream: winston.stream}));

console.log(app.get('env'));
if(app.get('env') === "development") {
    app.use(morgan('tiny'));
}
app.use('/api/auth', Auth);
app.use('/api/product', Products);
app.use('/api/fabrication', Fabrications);
const port = process.env.port || 8000;


// configuration test
// console.log(`Application name: ${confi.get("name")}`);
// console.log(`Application mail host: ${confi.get("mail.host")}`);
// appDebug(process.env.SECRET);



app.get("/", (req, res)=> {
    res.json({
        name:"Aakash",
        age:25
    });
});

app.use(error);


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});