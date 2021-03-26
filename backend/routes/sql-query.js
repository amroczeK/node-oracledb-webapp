const router = require("express").Router();
const { query } = require("../controllers/sql-query");

router.route("/query").post(query);

module.exports = router;
