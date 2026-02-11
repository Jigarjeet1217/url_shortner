const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const config = require('./config/config.js');
require('./db/knex.js');
let loginRouter = require('./routes/login.route.js');
let userRouter = require('./routes/user.route.js');
let urlRouter = require('./routes/url.route.js');
const { authenticated } = require('./middlewares/authenticated.js');
dotenv.config({ override: true, path: './config/env/dev.env' });
global.config = config;

let port = process.env.PORT || 6000;
let app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/login', loginRouter);
app.use(authenticated);
app.use('/user', userRouter);
app.use('/url', urlRouter);

// 404 route handler
app.use('/', (req, res, next) => {
	return res.status(404).json({
		message: "404 Error",
		error: "The route doesnot exist!!"
	})
})

app.listen(port, () => console.log(`Server listening on port ${port}!!!`));