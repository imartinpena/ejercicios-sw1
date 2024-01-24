const express = require('express');
const app = require('../app');
const router = express.Router();

require('../var');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', cookies: cookies });
});

router.post('/', function(req, res, next){
  let value = req.body.cookies;
  cookies = value;
  res.redirect(req.originalUrl);
});

module.exports = router;
