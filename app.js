//external imports
const express = require('express');
const http = require("http");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require("cookie-parser");
const moment = require("moment");


//internal imports
const { notFounHandler, errorHandler } = require('./middlewares/common/errorHandler');
const loginRouter = require('./router/loginRouter.js');
const usersRouter = require('./router/usersRouter.js');
const inboxRouter = require('./router/inboxRouter.js');

const app = express();
const server = http.createServer(app);
dotenv.config();

// socket creation
const io = require("socket.io")(server);
global.io = io;

// set comment as app locals
app.locals.moment = moment;


//database connection with moongose
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log('connection successful'))
    .catch(err => console.log('error'));

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view enginee
app.set('view engine', 'ejs');

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);

//404 not found handler
app.use(notFounHandler);

//common error handler
app.use(errorHandler);

//server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
