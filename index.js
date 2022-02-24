const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('./mongooseConnect/dbConfig');
const postsRoutes = require('./routes/postsController');
const usersRoutes = require('./routes/usersController');
const voyagesRoutes = require('./routes/voyages');

app.use(bodyParser.json());
app.use('/posts', postsRoutes);
app.use('/', usersRoutes);
//app.use('/', voyagesRoutes);
const PORT = process.env.PORT || 5501
app.listen(PORT, () => console.log('Server started : 5501'));