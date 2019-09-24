const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const loginRoutes = require('./routes/loginRoutes');
const orderRoutes = require('./routes/orderRoutes');
const registerRoutes = require('./routes/registerRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const avatarRoutes = require('./routes/avatarRoutes');
const bodyParser = require('body-parser');
let status;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@aiw-pywpp.mongodb.net/aiw`;
mongoose.connect(uri,  { useNewUrlParser: true })
    .then((data) => {
        console.log('Successfully connetced to DB', data.connections);
    status = 'Connected';
    })
    .catch(error => {
        console.log(error);
    })

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization");
   next();
  });
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000);

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/order', orderRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/upload', avatarRoutes);
app.get('/', (req, res) => {
    res.status(200).json({message: 'Default Route', status: status});
});
