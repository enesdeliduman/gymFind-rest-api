const express = require("express")
const dotenv = require("dotenv")
const app = express()

const connectDatabase = require("./helpers/database/connectDatabase")
const { ErrorHandler } = require("./middlewares/ErrorHandler")

dotenv.config({
    path: "./config/env/.env"
})
app.use(express.json());
app.use('/public', express.static('public'))

const routers = require("./routers/index")
app.use("/api", routers)
app.use(ErrorHandler)

// Database connection
connectDatabase()

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})