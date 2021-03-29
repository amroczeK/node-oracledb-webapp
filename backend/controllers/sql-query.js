const oracledb = require("oracledb");
const isEmpty = require("lodash.isempty");

// @desc    Query Oracle Database
// @route   POST /api/query
// @access  Public
const query = async (req, res) => {
  const { sql, queryBinds } = req.body;

  let options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    autoCommit: true, // Enable this to autocomit transactions
    // If you are fetching a fixed number of rows, start your tuning by setting fetchArraySize
    // to the number of expected rows, and set prefetchRows to one greater than this value.
    // REF: http://oracle.github.io/node-oracledb/doc/api.html#-311-tuning-fetch-performance
    prefetchRows: 500, // internal buffer sizes can be adjusted for performance tuning
    fetchArraySize: 500,
    resultSet: true,
  };

  let binds = {};

  if (!isEmpty(queryBinds)) {
    Object.keys(queryBinds).map((bind) => {
      // More types: http://oracle.github.io/node-oracledb/doc/api.html#-42624-type
      if (bind.type === "String") {
        binds[bind] = {
          val: queryBinds.value,
          type: oracledb.STRING,
        };
      }
      if (bind.type === "Number") {
        binds[bind] = {
          val: queryBinds.value,
          type: oracledb.NUMBER,
        };
      }
    });
  }

  let connection;

  // NOTE: This controller is only for SELECT queries, if you want to write to a database
  // use connection.execute() instead.
  // http://oracle.github.io/node-oracledb/doc/api.html#execute
  try {
    // Get a connection from the pool
    connection = await oracledb.getConnection(process.env.POOL_ALIAS);

    //pool._logStats(); // To help debug the connection pool
    const stream = await connection.queryStream(sql, binds, options);

    const consumeStream = new Promise((resolve, reject) => {
      let data = {};
      let rows = [];

      stream.on("error", function (error) {
        console.log("Stream error:", error);
        reject(error);
      });

      // Columns stored in metadata
      stream.on("metadata", function (metadata) {
        data.metaData = metadata;
      });

      stream.on("data", function (data) {
        rows.push(data);
      });

      stream.on("end", function () {
        stream.destroy(); // clean up resources being used
      });

      stream.on("close", function () {
        // The underlying ResultSet has been closed, so the connection can now
        // be closed, if desired.  Note: do not close connections on 'end'.
        data.rows = rows;
        resolve(data);
      });
    });

    const data = await consumeStream;

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.toString() });
  } finally {
    if (connection) {
      try {
        // Put the connection back in the pool
        console.log("Returning connection into the pool");
        await connection.close();
      } catch (error) {
        console.log("Error in closing oracledb connection:", error);
        throw error;
      }
    }
  }
};

module.exports = { query };
