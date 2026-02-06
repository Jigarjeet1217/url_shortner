const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
require('./db/knex.js');
let signupRouter = require('./routes/signup.route.js');
dotenv.config({ override: true, path: './config/env/dev.env' });

let port = process.env.PORT || 6000;
let app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/signup', signupRouter);

app.listen(port, () => console.log(`Server listening on port ${port}!!!`));