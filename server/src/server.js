const server = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./router");
require("dotenv").config();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const PORT = process.env.PORT || 3333;
router.initializeRoutes(server);

server.get("/", (req, res) => {
  res.status(200).json({ online: true });
});

server.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`);
});
