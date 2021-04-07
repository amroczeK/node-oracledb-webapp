# Node-oracledb Web Application

This web application allows you to run SQL SELECT Queries against an Oracle Database using node-oracledb module, which is an Oracle Database driver for Node.js maintained by Oracle Corp.

### Application features:

- Concurrent API calls/queries using [Async.Queue](https://caolan.github.io/async/v3/docs.html#queue)
- Binding variables to SQL queries for better performance
- Run up to 10 queries concurrently
- Bind up to 5 variables
- Run queries with and without binds
- Results table

NOTES:

- This application is using [node-oracledb connection pooling](https://oracle.github.io/node-oracledb/doc/api.html#-153-connection-pooling) so adjust the pool settings according to your Oracle Database configuration.
- This application is using [node-oracledb query streaming](https://oracle.github.io/node-oracledb/doc/api.html#-1613-query-streaming) and therefore only processes SELECT statements.
- If you want to execute INSERT or PL/SQL satements/execution, connect using [execute()](https://oracle.github.io/node-oracledb/doc/api.html#-426-connectionexecute) instead of [queryStream()](https://oracle.github.io/node-oracledb/doc/api.html#-4213-connectionquerystream)

## Pre-requisites

- Install Node.js from [nodejs.org](https://nodejs.org/en/download/)
- Add Oracle Client Libraries to your local environment. Follow [Quick Start node-oracledb Installation](https://oracle.github.io/node-oracledb/INSTALL.html#-2-quick-start-node-oracledb-installation)
- Create a .env file in your root directory with the following example:

```
ORACLE_CLIENT_LOC=/usr/local/lib/instantclient_19_8
POOL_ALIAS=<pool alias>
DB_USER=<db username>
DB_PASSWORD=<db password>
DB_CONN_STRING=<hostname/ip>:<port>/<service name>
```

- Install the dependencies using the following commands from the root folder

```
npm install

cd frontend
npm install
```

## Usage

This application uses the [concurrently module](https://www.npmjs.com/package/concurrently) to run the frontend and backend at the same time.

Run the following to run frontend and backend

```
npm run dev
```

Run the following to run just the frontend

```
npm run client
```

Run the following to run just the backend

```
npm run start
```

Run the following to run just the backend with nodemon during development

```
npm run server
```

## Preview
NOTE: Queries and results have been obfuscated.
![Alt text](./preview.PNG?raw=true 'Preview')