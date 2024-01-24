const express = require('express');
const router = express.Router();
const users = require('../users'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express', cookies: cookies });
});

router.post('/', function(req, res, next){
  let user = req.body.username;
  if(users[user]){
      users.comparePass(req.body.password, users[user].hash, function(err, result){
          if(result){
              req.session.user = users[user];
              req.session.name = users[user].name;
              req.session.message = "Welcome!"
              res.redirect("/restricted");
          } else {
              req.session.error = "Incorrect user or password";
              res.redirect("/login");
          }
      });
  } else {
      req.session.error = "Incorrect user or password";
      res.redirect("/login");
  }
});

module.exports = router;
