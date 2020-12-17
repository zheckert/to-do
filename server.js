const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect("mongodb://localhost:27017/tododb",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("Connected to database")
)

app.use("/todo", require("./routes/todoRouter.js"))

app.use((error, req, res, next) => {
    console.log(error)
    return res.send({errorMessage: error.message})
})

app.listen(9001, () => {
    console.log("The server is running on Port 9001")
})