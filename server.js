const express = require('express');
const routes = require('./backend/controllers/routes')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/student',
{ useNewUrlParser: true, useUnifiedTopology: true })
const port = 8000;

app.listen(port, () => {
    console.info('server started on port : ' + port)
})
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static('images'));
app.use('/', routes);





