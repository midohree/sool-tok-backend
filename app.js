const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/users', usersRouter);

app.listen(3000, () => {
  console.log('Server is running on 3000');
});
