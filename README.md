# Node-oracledb Web Application

This web application allows you to run SQL Queries against an Oracle Database using node-oracledb module, which is an Oracle Database driver for Node.js maintained by Oracle Corp.

Application features:
- Concurrent API calls/queries using [Async.Queue](https://caolan.github.io/async/v3/docs.html#queue)
- Binding variables to SQL queries for better performance
- Run up to 10 queries concurrently
- Bind up to 5 variables
- Run queries with and without binds
- Results table