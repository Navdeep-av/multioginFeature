require("dotenv").config();

const port = process.env.PORT || 5130;
const expiredIn = process.env.EXPIRESIN || "2h";
const secret_Key = process.env.SECRET_KEY || "hjbhvhcgsjghsaghjbhvhcgsjghsag";
const mongoURI = process.env.MONGOURI || "";

module.exports = { port, expiredIn, secret_Key, mongoURI };
