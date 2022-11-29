const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
    app.use(
        cors({
            origin: ['http://localhost:3000'],
            credentials: true,
        })
    );
}

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});


// connects our backend code with the database
mongoose.connect('mongodb+srv://Szylman:qwerty123@cluster0.iarn6tt.mongodb.net/ADSDB',{
useNewUrlParser: true,
useUnifiedTopology: true
});
const db = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://Szylman:qwerty123@cluster0.iarn6tt.mongodb.net/ADSDB',
        mongoOptions: { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    cookie: {
        secure: process.env.NODE_ENV == 'production',
    },
}));

//import routes
const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/api/', adsRoutes);
app.use('/api/auth/', authRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/uploads/')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json('404 not found...');
})

