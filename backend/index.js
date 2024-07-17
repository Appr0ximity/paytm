const express = require("express");
const { rootRouter } = require("./routes");

const app = express()

app.use("/api/v1", rootRouter)

app.listen(3000)