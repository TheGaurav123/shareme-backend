const { files, download } = require("./routes");
const express = require('express')
const app = require("express")();
const cors = require('cors')
require("dotenv").config();
require("./config/db");

app.use(cors())

app.use(express.json())


// Routes

app.use("/api", files); //Upload Route

app.use('/api/files/', download) //Download Route




// Listener
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running at PORT:${PORT}`));

