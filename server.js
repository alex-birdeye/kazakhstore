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

app.put('/categories/:old/:newcat', function (req, res) {
    var old = req.params.old;
    var newcat = req.params.newcat;


    db.categories.update({name: old}, {$set: {name: newcat}}, function (req, res) {
        console.log('category ' + old);
        console.log('updated to ' + newcat);
    });
    res.send(200);
});

app.get('/categories', function (req, res) {
    db.categories.find(function (err, docs) {
        res.json(docs);
    });
});
app.get('/categories/:category', function (req, res) {
    var category = req.params.category;
    //console.log(category);
    db.categories.find({name: category},function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.delete('/categories/:category', function (req, res) {
    var category = req.params.category;
    db.categories.remove({name: category}, function (err, docs) {
        console.log(category + ' deleted')
    });
    //db.categories.find(function (err, docs) {
    //    res.json(docs);
    //});
    res.send(200);
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

app.post('/subcategories/:category/:subcategory', function (req, res) {
    var category = req.params.category;
    var subcategory = req.params.subcategory;
    db.categories.update({name: category}, {$push: {subcategories: subcategory}}, function (err, docs) {
        console.log(category + ' category added subcat: ' +subcategory );
        res.send(200);
    });
    //db.categories.find({name: category}, function (err, docs) {
    //    res.json(docs);
    //});
});

app.delete('/subcategories/:category/:subcategory', function (req, res) {
    var category = req.params.category;
    var subcategory = req.params.subcategory;
    db.categories.update({name: category}, {$pull: {subcategories: subcategory}}, function (err, docs) {
        console.log(category + ' category deleted subcat: ' +subcategory );
        res.send(200);
    });
    //db.categories.find({name: category}, function (err, docs) {
    //    res.json(docs);
    //});
});

app.put('/subcategories/:category/:oldsubcategory/:newsubcategory', function (req, res) {
    var category = req.params.category;
    var oldsubcategory = req.params.oldsubcategory;
    var newsubcategory = req.params.newsubcategory;
    db.categories.update({name: category, subcategories: oldsubcategory}, {$set: {"subcategories.$": newsubcategory}}, function (err, docs) {
        console.log(category + ' category updated subcat: ' + oldsubcategory + ' to ' + newsubcategory );
        res.send(200);
    });
    //db.categories.find({name: category}, function (err, docs) {
    //    res.json(docs);
    //});
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
