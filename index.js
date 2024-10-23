const express = require('express');
const app = express();
const path = require('path');

const morgan = require('morgan');
app.use(morgan('dev'));

//Ejs is used as engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let dataStore = [];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' });
});


app.get('/user/:name', (req, res) => {
    res.render('user', { username: req.params.name });
});

// Create (POST)
app.post('/submit', (req, res) => {
    const newData = req.body.data;
    dataStore.push(newData); // Add new data to the store
    res.send('Form submitted successfully!');
});

// Read (GET)
app.get('/data', (req, res) => {
    res.json(dataStore);
});

// Update (PUT)
app.put('/update/:index', (req, res) => {
    const index = req.params.index;
    const updatedData = req.body.updatedData;
    if (index >= 0 && index < dataStore.length) {
        dataStore[index] = updatedData;
        res.send('Data updated successfully!');
    } else {
        res.status(404).send('Data not found');
    }
});

// Delete (DELETE)
app.delete('/delete/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < dataStore.length) {
        dataStore.splice(index, 1);
        res.send('Data deleted successfully!');
    } else {
        res.status(404).send('Data not found');
    }
});

app.get('/download', (req, res) => {
    const file = `${__dirname}/public/GTAcarr1.jpg`;
    res.download(file);
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});


app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});