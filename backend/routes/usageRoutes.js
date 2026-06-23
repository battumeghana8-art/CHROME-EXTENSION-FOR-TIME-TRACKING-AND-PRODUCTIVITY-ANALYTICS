const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/", (req, res) => {

  const data =
    JSON.parse(
      fs.readFileSync("./data.json")
    );

  data.push(req.body);

  fs.writeFileSync(
    "./data.json",
    JSON.stringify(data, null, 2)
  );

  res.json({
    success: true
  });
});

router.get("/", (req, res) => {

  const data =
    JSON.parse(
      fs.readFileSync("./data.json")
    );

  res.json(data);
});

module.exports = router;