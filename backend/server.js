require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const setupRouting = require("./config/routing");
const { initOracleClient, initConnectionPool } = require("./config/connection-pool");
const PORT = process.env.PORT || 3001;

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// Parse application/json
app.use(express.json());
app.use(cookieParser());

initOracleClient();
setupRouting(app);
initConnectionPool()
  .then(() => app.listen(PORT, console.log(`Server running on port ${PORT}`)))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
