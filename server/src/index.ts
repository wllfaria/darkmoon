import express from 'express';
import Router from "./router";
import * as bodyParser from 'body-parser'
import './env';

const cors = require('cors')
const server = express();
const router = new Router(server);
const port = process.env.PORT || 3333;

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(cors())
router.initializeRoutes();

server.get('/', cors(), (_req, res) => {
  res.status(200).json({ ok: true });
});

server.listen(port, () => { console.log(`Server is running on port ${port}`) });