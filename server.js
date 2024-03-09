const express = require("express")
const dotenv = require("dotenv")

const app = express()
const connectDatabase = require("./helpers/database/connectDatabase")
// const dummyData = require("./helpers/database/dummy-data")

const routers = require("./routers/index")

app.use(express.json());
app.use('/public', express.static('public'))

dotenv.config({
    path: "./config/env/.env"
})

// dummyData(5)

app.use("/api", routers)

// Database connection
connectDatabase()

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})