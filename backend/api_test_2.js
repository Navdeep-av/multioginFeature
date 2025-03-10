app.get("/test", deviceDetector, (req, res) => {
  res.json(req.deviceInfo);
});
