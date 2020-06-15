const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const categoryRouter = require('./routers/categoryRouter');
const productRouter = require('./routers/productRouter');

const app = express();

mongoose.connect('mongodb+srv://admin:1234@test-71ugy.mongodb.net/mathInfinity?retryWrites=true&w=majority');

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(categoryRouter);
app.use(productRouter);

app.listen(process.env.port || 4000, () => {
    console.log('App ready to listen port 4000');
});