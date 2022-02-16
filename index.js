const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('./models/dbConfig');
const postsRoutes = require('./routes/postsController');

app.use(bodyParser.json());
app.use('/', postsRoutes);
const PORT = process.env.PORT || 5501
app.listen(PORT, () => console.log('Server started : 5501'));