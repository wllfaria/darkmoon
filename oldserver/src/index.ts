import express from 'express';
import Router from "./router";
import * as bodyParser from 'body-parser'
import './env';
import { Database } from "./database";
import * as swaggerDoc from '../swagger.json'
import { RolesPermissionsMap } from './rolesPermissionsMap';
import log4js from 'log4js';

log4js.configure({
  appenders: {
    errorAppender: { type: "file", filename: "errors.log" },
    defaultAppender: { type: "file", filename: "default.log" }
  },
  categories: {
    error: {
      appenders: ["errorAppender"],
      level: "error"
    },
    default: {
      appenders: ["defaultAppender"],
      level: "debug"
    }
  }
})

const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const server = express();
const router = new Router(server);
const port = process.env.PORT || 3333;
const database = new Database();
const rolesPermissionsMap = new RolesPermissionsMap();

server.use('/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());

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
  } catch (e) {
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
  } catch (e) {
    _res.status(500).json({
      ok: false,
      message: "Database is not working properly.",
      reason: e
    })
  }
});

server.listen(port, () => { console.log(`Server is running on port ${port}`) });