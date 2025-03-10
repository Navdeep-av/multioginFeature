require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const connectDB = require("./services/DB/db.services.js");

const useragent = require("express-useragent");
const requestIp = require("request-ip");

app.use(useragent.express());
app.use(requestIp.mw());

const authsRouter = require("./api/authRouter/auth.routes.js");

const port = process.env.PORT;

connectDB();

app.use("/auths", authsRouter);

app.listen(port, () => {
  console.log(`Server runnign on ${port}`);
});
