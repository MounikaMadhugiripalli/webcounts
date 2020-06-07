const express = require("express");
const redis = require("redis");
const process = require("process");

const app = express();
const client = redis.createClient({
  host: "redis-server",
  port: 6379
});
client.set("visits", 0);

app.get("/", (req, res) => {
  //process.exit(0)
  client.get("visits", (err, visits) => {
    res.send("Total number of visits " + visits);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(4001, () => {
  console.log("listening on port 4001");
});
