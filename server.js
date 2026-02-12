const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const unlockData = JSON.parse(fs.readFileSync("./unlock.json"));
const unlockDate = new Date(unlockData.unlockDate);

app.use(express.static("public"));

app.get("/api/unlock-status", (req, res) => {
  const now = new Date();
  const unlocked = now >= unlockDate;

  res.json({
    unlocked,
    unlockDate
  });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
