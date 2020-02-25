require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/routes');

require('./database');

app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Listening on port " + PORT));

exports.app=app