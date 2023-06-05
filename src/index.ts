import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv'
import connect from './utils/connect.util';

dotenv.config();
const app: any = express();

app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server: any = http.createServer(app);
const serverName: string = 'http://localhost:8080/';

server.listen(8000, async () => {
    console.log(`Server running at ${serverName}`);
    await connect();
})


