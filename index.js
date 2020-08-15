require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3008;

app.use(bodyParser.json());

const routerv1 = require('./routes/routerv1');
app.use('/api/v1', routerv1)

app.use("/", (req, res) => {
  res.send("hello-world");
});

app.listen(port, () => console.log(`listening on port ${port}`));
