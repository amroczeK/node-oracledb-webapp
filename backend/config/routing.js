const QueryRoutes = require("../routes/sql-query");

const setupRouting = (app) => {
  console.log("Setting up routes.");
  app.use("/api/query", QueryRoutes);
};

module.exports = setupRouting;
