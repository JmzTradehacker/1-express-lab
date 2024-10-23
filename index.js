const express = require('express');
const app = express();
const path = require('path');

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




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});