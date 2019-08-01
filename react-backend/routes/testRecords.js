var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
  const testRecords = fs.readFileSync('./json/_testRecords.json');
  console.log(JSON.parse(testRecords));
  res.json(JSON.parse(testRecords));
});

module.exports = router;
