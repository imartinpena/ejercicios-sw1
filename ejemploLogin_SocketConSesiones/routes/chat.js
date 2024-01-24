const express = require('express');
const router = express.Router();
const database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chat', {user:req.session.user, username:req.session.user.username});
});

module.exports = router;
