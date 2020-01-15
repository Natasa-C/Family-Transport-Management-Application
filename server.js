require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index').router;
const transportRouter = require('./routes/transport').router;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

app.use('/', indexRouter);
app.use('/transports', transportRouter);

app.listen(process.env.PORT);