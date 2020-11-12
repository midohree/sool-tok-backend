const express = require('express');

const { port } = require('./configs');
const initLoaders = require('./loaders');
const usersRouter = require('./routes/users');

const app = express();

initLoaders(app);

app.use('/users', usersRouter);

// TODO: Error Handler

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
