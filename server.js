const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const users = require('./routes/users');
const posts = require('./routes/posts');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys-prod').mongoURI;

mongoose.connect(db,{useNewUrlParser: true}).then(() => {
    console.log('mongo connected');
}).catch((err) => {
    console.log(err);
});

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/posts', posts);

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;


app.listen(PORT);