const express = require('express');
const app = express();
const path = require('path');

const morgan = require('morgan');
app.use(morgan('dev'));

//Ejs is used as engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});

// Example route with a parameter
app.get('/user/:name', (req, res) => {
    res.render('user', { username: req.params.name });
});

app.post('/submit', (req, res) => {
    console.log(req.body.data);
    res.send('Success');
});

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});