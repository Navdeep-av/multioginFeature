const geoIp = require("geoip-lite");

const ipDetails = (req, res, next) => {
  console.log("inside Ip Details");
  try {
    const ip =
      req.client || req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const geo = geoIp.lookup(ip);

    req.deviceInfo = {
      device: req.useragent?.platform,
      os: req.useragent?.os,
      model: req.useragent?.browser,
      source: req.useragent?.source,
    };
  } catch (err) {
    console.log("Device Detection Err ", err);
  }
  next();
};

module.exports = ipDetails;
