var express = require('express');
var app = express();
var mongojs = require('mongojs');
//var db = mongojs('kazakhstore', ['clientM8Bid', 'extendedClients', 'countries', 'users', 'keywords', 'androclients', 'applications', 'statistics', 'statisticsAndro']);
var db = mongojs('kazakhstore', ['categories']);


app.use(express.static(__dirname + "/app"));
app.use(function (req, res, next) {
    res.body = "<script src=\"http://localhost:35729/livereload.js\"></script>";
    next();
});

app.put('/api/users/:fname/:lname/:uname/:pass', function (req, res) {
    var fname = req.params.fname;
    var lname = req.params.lname;
    var uname = req.params.uname;
    var pass = req.params.pass;

    //console.log(fname);
    //console.log(lname);
    //console.log(uname);
    //console.log(pass);

    //var jstr = '{' + '"firstName":"' + fname + '", "lastName":"' + lname + '", "username":"' + uname + '", "password":"' + pass + '"' + '}';
    var jstr = '{';
    if (fname !== null && fname !== 'undefined' && fname.length !== 0) {
        jstr += '"firstName":"' + fname + '", ';
    }
    if (lname !== null && lname !== 'undefined' && lname.length !== 0) {
        jstr += '"lastName":"' + lname + '", ';
    }
    if (pass !== null && pass !== 'undefined' && pass.length !== 0) {
        jstr += '"password":"' + pass + '", ';
    }
    jstr += '}';
    jstr = jstr.replace('", }', '"}');
    console.log(jstr);
    var updF = JSON.parse(jstr);
    db.users.findAndModify({query: {username: uname}, update: {$set: updF}}, function (err, docs) {
        res.send('ok');
    });
});

app.get('/categories', function (req, res) {
    db.categories.find(function (err, docs) {
        res.json(docs);
    });
});

app.delete('/categories/:category', function (req, res) {
    var category = req.params.category;
    db.categories.update({}, {$pull: {categories: {$in: [category]}}}, {multi: true}, function (err, docs) {
        console.log(category + ' deleted')
    });
    db.keywords.find(function (err, docs) {
        res.json(docs);
    });
});

app.post('/categories/:category', function (req, res) {
    var category = req.params.category;
    db.categories.insert({name: category}, function (err, docs) {
        console.log(category + ' inserted')
    });
    db.categories.find(function (err, docs) {
        res.json(docs);
    });
});

app.get('/api/users', function (req, res) {
    db.users.find(function (err, docs) {
        res.json(docs);
    });
});
app.get('/api/users/:username', function (req, res) {
    var username = req.params.username;
    db.users.find({username: username}, function (err, docs) {
        res.json(docs);
    });
});
app.delete('/api/users/:username', function (req, res) {
    var username = req.params.username;
    db.users.remove({username: username}, function (err, docs) {
        res.send('ok');
    });
});
app.post('/api/authenticate', function (req, res) {
    req.on('data', function (data) {
        var user = JSON.parse(data);
//        console.log(user);
        db.users.find({username: user.username}, function (err, docs) {
//            console.log(docs[0]);
//            var dbuser = JSON.parse(docs[0]);
//            console.log(dbuser.username);
            if (docs.length === 0) {
                console.log('no such user');
                res.status(403).send('no such user');
            } else {
                if (docs[0].username === user.username) {
                    if (docs[0].password === user.password) {
                        console.log('auth success');
                        res.send('ok');
                    } else {
                        console.log('auth failed. Wrong password');
                        res.status(403).send('auth failed. Wrong password');
                    }
                } else {
                    console.log('no such user');
                    res.status(403).send('no such user');
                }
            }
        });
    });
});
app.post('/api/users', function (req, res) {
    req.on('data', function (data) {
        var user = JSON.parse(data);
        console.log(user);
        if (user.username === null || user.username.length === 0 || user.username === 'undefined') {
            res.status(403).send('Username required !');
        } else {
            db.users.find({username: user.username}, function (err, docs) {
                if (docs.length === 0) {
                    db.users.ensureIndex({username: 1}, {'unique': true});
                    db.users.insert(user, function (err, docs) {
                        res.send('ok');
                    });
                } else {
                    res.status(403).send('user exists');
                }
            });
        }
    });
});


app.listen(3030);
console.log("Server started on port 3030");
