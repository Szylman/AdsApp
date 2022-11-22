const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

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
app.use(helmet());
app.use(session({
    secret: process.env.secret,
    store: MongoStore.create(mongoose.connection),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
    },
}));

// connects our backend code with the database
mongoose.connect('mongodb+srv://Szylman:qwerty123@cluster0.iarn6tt.mongodb.net/ConcertDB',
);
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const io = socket(server);

io.on('connection', (socket) => {

    console.log('New socket!')
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

//import routes
const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/api/', adsRoutes);
app.use('/auth', authRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/uploads/')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json('404 not found...');
})

