const express = require("express");
const { User } = require("./db");
const mainRouter = require("./routes");
const cors = require('cors');
const app = express()

User();
app.use(cors())
app.use(express.json())
app.use('/api/v1', mainRouter)

app.listen(3000)