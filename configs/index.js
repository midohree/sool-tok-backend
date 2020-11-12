require('dotenv').config();

const port = process.env.PORT;

const databaseURL = process.env.MONGODB_URL;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: 'sool-tok',
};

const tokenSecretKey = process.env.TOKEN_SECRET_KEY;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

module.exports = {
  port,
  databaseURL,
  mongooseOptions,
  tokenSecretKey,
  corsOptions,
};
