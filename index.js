import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config({ override: true, path: './config/env/dev.env' });

let port = process.env.PORT || 6000;
let app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => console.log(`Server listening on port ${port}!!!`));