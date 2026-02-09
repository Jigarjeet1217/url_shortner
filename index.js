const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const config = require('./config/config.js');
require('./db/knex.js');
let signupRouter = require('./routes/user.route.js');
dotenv.config({ override: true, path: './config/env/dev.env' });
global.config = config;

let port = process.env.PORT || 6000;
let app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/user', signupRouter);

app.listen(port, () => console.log(`Server listening on port ${port}!!!`));