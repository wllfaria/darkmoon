import express from 'express';
import Router from "./router";
import * as bodyParser from 'body-parser'
import './env';
import { Database } from "./database";

const cors = require('cors')
const server = express();
const router = new Router(server);
const port = process.env.PORT || 3333;
const database = new Database();

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(cors())
router.initializeRoutes();

server.get('/', cors(), (_req, res) => {
  res.status(200).json({ ok: true });
});

server.get('/database-test', async (_req, _res) => {
  try {
    const result = await database.testConnection();
    _res.status(200).json({ 
      ok: true,
      msg: "Database is working properly.",
      list_of_dbs: result
    });
  } catch(e) {
    _res.status(500).json({
      ok: false,
      message: "Database is not working properly.",
      reason: e
    })
  }
});

server.get('/tables-test', async (_req, _res) => {
  try {
    const result = await database.testTables();
    _res.status(200).json({ 
      ok: true,
      msg: "Database is working properly.",
      list_of_dbs: result
    });
  } catch(e) {
    _res.status(500).json({
      ok: false,
      message: "Database is not working properly.",
      reason: e
    })
  }
});

server.listen(port, () => { console.log(`Server is running on port ${port}`) });