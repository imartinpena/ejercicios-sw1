const express = require('express');
const router = express.Router();
const users = require('../users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express', cookies: cookies });
});

router.post('/', function(req, res, next){
  let user = req.body.username;
  let name = req.body.name;
  let password = req.body.password;
  if (users[user]){
    req.session.error = "User already exist!";
    res.redirect("/register");
  } else {
    users.register(user, password, name);
    req.session.user = user;
    req.session.name = name;
    req.session.message = "Successful registration"
    res.redirect('/restricted');
  }
});

module.exports = router;
