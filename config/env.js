const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'your_mongodb_uri',
  SESSION_SECRET: process.env.SESSION_SECRET || 'your_session_secret',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  PORT: process.env.PORT || 8080
};
