var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* POST account to database */
router.post('/love', function(req, res, next) {
    console.log("In /love POST route...");
    console.log(req.body);
    var newUser = new User(req.body);
    newUser.save(function(err, post) {
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

router.get('/love', function(req, res, next) {
    console.log("In /love GET route...");
    var uname = req.query["uname"];
    var pword = req.query["pword"];
    console.log("Uname: " + uname + " Pword: " + pword);
    var obj = {};
    if (uname && pword) {
        obj = { username: uname, password: pword };
    }
    User.find(obj, 
        function(err, userList) {
            if (err) return console.error(err);
            else console.log(userList);
            res.json(userList);
        });
});

router.delete('/love', function(req, res, next) {
    console.log("In /love DELETE route...");
    User.deleteMany({}, function(err, rest) {
        if (err) return console.error(err);
        else console.log(rest);
        res.sendStatus(200);
    });
});

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/loveDB', { useNewUrlParser: true });

var accountSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    age: Number,
    image: String,
    gender: String,
    interests: String,
    bio: String
});

var User = mongoose.model('Love', accountSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

module.exports = router;
