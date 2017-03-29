var express = require('express');
var router = express.Router();
var config = require('../setting/config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const request = require("request");

var getApi = function(callback){
  var shPath = config.spreadsheets.shPath,
  shKey = config.spreadsheets.agenda.shKey,
  shCallback = 'public/values?alt=json',
  shList = config.spreadsheets.agenda.shList;
  let path = '';
  path = `${shPath}${shKey}/${shList}/${shCallback}`;
  return request({
    'url': path,
    'json': true,
  }, callback);
}

getApi(function(error, response, body){
  console.log(response.body.feed.entry)
  if (!error && response.statusCode === 200) {
    var data = response.body;
  }
});
getApi();

module.exports = router;
