var express = require ('express'); 
var app = express(); 
var nodemon = require ('nodemon');
 
require('dotenv').config(); 
var path = require("path"); 

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

var mongoose = require ('mongoose'); 
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useFindAndModify', false);
    mongoose.connect(process.env.MONGO_URI);
    var db = mongoose.connection;

var bcrypt = require('bcrypt');
var session = require('express-session'); 
var mongoStore = require('connect-mongo')(session); 
app.use(session({secret: process.env.secret, 
    resave: false, saveUninitialized: true,
    cookie: {maxAge: null},
    store: new mongoStore({mongooseConnection: db})}));

app.listen(process.env.PORT || 8080, () => {
    console.log('Port 8080 is Active.')
});

var cors = require('cors'); 
app.use(cors()); 

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
  });

var Schema = mongoose.Schema;  
var userSchema = new Schema ({
    name: String, 
    email: String,
    password: String,
    finishedQuizzes: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ['Novice', 'Intermediate', 'Advanced'],
        default: 'novice'
    },
}); 

const User = mongoose.model('User', userSchema);

app.get('/api', (req, res, done) => {
    console.log(req.session.sessionID)
    if(req.session.sessionID) {
        console.log(req.session.sessionID)
        User.findById(req.session.sessionID, (err, data) => {
            res.send(data)
            console.log(data)
        })
    }
    else {
    done(null)
    }
})

app.get('/apiquiz4', (req, res, done) => {
    if(req.session.sessionID) {
        User.findById(req.session.sessionID, (err, data) => {
            if(err) {
                done(err);
            }
            if(data.finishedQuizzes < 2 || data.finishedQuizzes === undefined) {
                done(null)
            }
            else {
                res.send(true)
            }
        })
    }
    else {
    done(null)
    }
})

app.get('/apiquiz5', (req, res, done) => {
    if(req.session.sessionID) {
        User.findById(req.session.sessionID, (err, data) => {
            if(err) {
                done(err);
            }
            if(data.finishedQuizzes < 4 || data.finishedQuizzes === undefined) {
                done(null)
            }
            else {
                res.send(true)
            }
        })
    }
    else {
    done(null)
    }
})

app.get('/navbarcall', (req, res) => {
    if (req.session.sessionID) {
        res.send(true); 
    }
    else {
        res.send(false)
    }
})

app.get('/test', (req, res) => {
    User.find({email: 'm@m'}, (err, data) => {
        res.send(data)
    })
})

app.post('/test2', (req, res, done) => {
    const email = 'r@r'
    User.findOneAndUpdate(
        {email: email}, 
        {$set: {finishedQuizzes: 1}},
        {new: true},
        (err, data) => {
            console.log(data)
            req.session.sessionID = data._id
            console.log(req.session.sessionID);
            done(null, req.session.sessionID)
    })
})


app.get("/profileapi", (req, res, done) => {
    if(req.session.sessionID) {
        User.findById(req.session.sessionID, (err, data) => {
            res.send(data); 
            console.log(data)
        })
    }
    else {
        done(null)
    }
})

app.get('/login2', (req, res) => {
    if(req.session.sessionID) {
        res.send(true);
    }
    else{ 
        res.send(false); 
    }   
})

app.post("/quiz", (req, res, done) => {
        if (req.session.sessionID) {
        User.findById(req.session.sessionID, (err, data) => {
            if(err) {
                done(err); 
            }
            if (data.finishedQuizzes < 2) {
                User.findOneAndUpdate (
                    {_id: req.session.sessionID}, 
                    {$set: {role: "Novice", finishedQuizzes: data.finishedQuizzes++}}, 
                    {new: true},
                    (err, data) => {
                    if (err) {
                        done(err); 
                    }
                    console.log(data); 
                    console.log(data.role); 
                    console.log(data.finishedQuizzes); 
                    done(null, data); 
                    })
                }
            if (data.finishedQuizzes >= 2 && data.finishedQuizzes < 4) {
                User.findOneAndUpdate (
                    {_id: req.session.sessionID}, 
                    {$set: {role: "Intermediate", finishedQuizzes: data.finishedQuizzes++}}, 
                    {new: true},
                    (err, data) => {
                    if (err) { 
                        done(err); 
                    }
                    console.log(data); 
                    console.log(data.role); 
                    console.log(data.finishedQuizzes); 
                    done(null, data); 
                    })
                }
            if (data.finishedQuizzes >= 4) {
                User.findOneAndUpdate (
                    {_id: req.session.sessionID}, 
                    {$set: {role: "Advanced", finishedQuizzes: data.finishedQuizzes++}}, 
                    {new: true},
                    (err, data) => {
                    if (err) {
                        done(err); 
                    }
                    console.log(data); 
                    console.log(data.role); 
                    console.log(data.finishedQuizzes); 
                    done(null, data); 
                    })
                }
            data.save((err, data) => {
                if(err) {
                    done(err);
                }
                done(null,data);
            })
        })
    }
    else {
        done(null)
    }
})

app.get("/quizreturn", (req, res) => {
    if(req.session.sessionID) {
        User.findById(req.session.sessionID, (err, data) => {
            res.send(data)
        })
    }
    else {
        res.send(0)
    }
})

app.post("/register", (req, res, done) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 10, (err, hash) => {
    var addedUser = new User ({
        name: name,
        email: email,
        password: hash,
        role: 'Novice'
    })
    addedUser.save((err, data) => {
        if (err) {
            return done(err); 
            res.redirect('/register'); 
        }
        req.session.sessionID = data._id; 
        console.log(req.session.sessionID); 
        done(null, data); 
        console.log(data); 
    })
    })
}); 

app.get('/register', (req, res) => {
    if(req.session.sessionID) {
        res.send(true);
    }
    else{ 
        res.send(false); 
    }  
})

app.post('/login', (req, res, done) => {
    const email = req.body.email; 
    const password = req.body.password;
    User.find({email: email}, (err, data) => {
        if (err) { 
            done(err); 
            console.log("email not found.")
        }
        else { 
        console.log('email found!'); 
        bcrypt.compare(password, data[0].password, (err, result) => {
            if(err) {
                done(err);
                console.log('passwords do not match.')
            }
            if(result === true) {
                req.session.sessionID = data[0]._id; 
                console.log(data); 
                console.log(req.session.sessionID);   
                done(null, req.session.sessionID);
            }
        }) 
        }
    })
})

app.post('/logout', function (req, res, done) {
    if (req.session.sessionID) {
      req.session.destroy();
      }
    });