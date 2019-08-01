var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var router = express.Router();
var jsonParser = bodyParser.json();

router.post('/', jsonParser, function(req, res) {
  if(!req.body) return res.sendStatus(400);
  let myJson = req.body;
  const unicIdentifyer = Math.random().toString(36).substr(2, 9);
  fs.writeFileSync(`./json/${unicIdentifyer}.json`, JSON.stringify(myJson));
  return res.send({'secretString': unicIdentifyer});
});

router.post('/secret', function(req, res, next) {
  if(!req.body) return res.sendStatus(400);
  console.log(req.body);
  const records = fs.readFileSync(`./json/${req.body.value}.json`);
  console.log(JSON.parse(records));
  return res.json(JSON.parse(records));
});

module.exports = router;
