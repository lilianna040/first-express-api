const express = require("express");
const bodyParser = require("body-parser");
// const { ObjectID } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const app = express();
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let artists = [{id: 1, name: 'Metallica'}, {id: 2, name: 'Iron Maiden'}, {id: 3, name: 'Deep Purple'}];

app.get('/', function(req, res) {
      res.send("Hi API");
})
app.get('/artists', function(req, res) {
    db.collection('artists').find().toArray(function (err, docs){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
    // res.send(artists);
})
app.get('/artists/:id', function(req, res) {
    db.collection('artists').findOne({ _id: ObjectId(req.params.id)}, function(err, doc) {
        if(err) {
            console.log(error);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
    console.log(req.params);
    // let artist = artists.find(function(artist){
    //     return artist.id === Number(req.params.id)
    // });
    // res.send(artist);
})
app.post('/artists', function(req, res) {
    let artist = {
        // id: Date.now(),
        name: req.body.name
    };
    db.collection('artists').insert(artist, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    })
    // artists.push(artist);
    // console.log(req.body);
    // res.send(artist);
})
app.put('/artists/:id', function (req, res) {
    db.collection('artists').updateOne(
        { _id: ObjectId(req.params.id) }, 
        // { name: req.body.name },
        { $set: {name: req.body.name}},
        function(err, result) {
            if(err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
})
    // let artist = artists.find(function(artist){
    //     return artist.id === Number(req.params.id)
    // })
    // artist.name = req.body.name;
    // res.sendStatus(200);
    // })
app.delete('/artists/:id', function (req, res) {
    db.collection('artists').deleteOne( 
        { _id: ObjectId(req.params.id) },
        function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
})
//     artists = artists.filter (function (artist) {
//         return artist.id !== Number(req.params.id);
//     })
//     res.sendStatus(200);
// })  


MongoClient.constructor({ useUnifiedTopology: true });
MongoClient.connect('mongodb://localhost:27017/myapi', function (err, client) {
    if(err) {
        return console.log(err);
    }
    db = client.db('testdb');
    // console.log('connectiion OK', db, db.collection);
    app.listen(3000, function() {
            console.log("API app started");
        })
});