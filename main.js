const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

const authController = require('./routes/auth');
const categoryController = require('./routes/category');

const keys = require('./config/keys');

app.use(cors({
    origin: 'http://localhost:3000', // адрес фронтенда
    credentials: true                // разрешение кросс-доменных cookie
}));

app.use(passport.initialize());
require('./middleware/passport')(passport);

mongoose.connect(keys.mongoUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authController);
app.use('/api/category', categoryController);

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(4005, () => {
    console.log('Server is running on port 4005');
})