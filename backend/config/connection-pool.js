const oracledb = require("oracledb");

const initOracleClient = () => {
  try {
    oracledb.initOracleClient({ libDir: process.env.ORACLE_CLIENT_LOC });
  } catch (err) {
    console.error("Error initializing oracle client:", err);
    process.exit(1);
  }
};

const initConnectionPool = async () => {
  try {
    console.log(`Initializing connection pool to ${process.env.POOL_ALIAS}`);
    await oracledb.createPool({
      //_enableStats: true, // Default is false, enables console.log(pool._logStats())
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONN_STRING,
      poolAlias: process.env.POOL_ALIAS, // set an alias to allow access to the pool via a name.
      poolIncrement: 0, // only grow the pool by one connection at a time
      poolMin: 4, // start with no connections; let the pool shrink completely
      poolMax: 4, // maximum size of the pool. Increase UV_THREADPOOL_SIZE if you increase poolMax
      poolPingInterval: 60, // check aliveness of connection if idle in the pool for 60 seconds
      poolTimeout: 60, // The number of seconds after which idle connections (unused in the pool) are terminated
      queueMax: 500, // don't allow more than 500 unsatisfied getConnection() calls in the pool queue
      queueTimeout: 90000, // terminate getConnection() calls queued for longer than 90000 milliseconds
    });
  } catch (error) {
    throw new Error("initConnectionPool() error: " + error.message);
  }
};

const closePoolAndExit = async () => {
  console.log("\nClosing connection");
  try {
    // Get the pool from the pool cache and close it when no
    // connections are in use, or force it closed after 5 seconds.
    // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file.
    // This setting should not be needed if both Oracle Client and Oracle
    // Database are 19c (or later).
    await oracledb.getPool(process.env.POOL_ALIAS).close(5);
    console.log("Connection pool closed");
    process.exit(0);
  } catch (err) {
    console.error("Error occured closing pools:", err.message);
  }
};

process.once("SIGTERM", closePoolAndExit).once("SIGINT", closePoolAndExit).once("SIGUSR2", closePoolAndExit).once("restart", closePoolAndExit);

module.exports = { initOracleClient, initConnectionPool, closePoolAndExit };
