const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('restricted', { title: 'Express', name: req.session.name, cookies: cookies });
});

module.exports = router;