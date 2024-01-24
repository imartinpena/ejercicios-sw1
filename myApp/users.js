const bcrypt = require("bcrypt");

const users = {};

users.comparePass = function(pass, hash, callback){
    bcrypt.compare(pass, hash, callback);
}

users.generateHash = function(pass, callback){
    bcrypt.hash(pass, 10, callback);
}

users.register = function(username, pass, name, callback){
    users.generateHash(pass, function(err, hash){
        users[username] = {username, hash, name};
        if (callback) {
            callback();
        };
    });
}

users.register('admin', 'admin', 'Xavier', function(){
    console.log('User admin successfully registered');
});
users.register('user', 'user', 'user');

module.exports = users;