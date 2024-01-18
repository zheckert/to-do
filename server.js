require('dotenv').config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const path = require("path")

const port = process.env.PORT || 9001


app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "client", "public")))

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to the database"))
    .catch(error => console.error("Error connecting to the database:", error));

app.use("/todo", require("./routes/todoRouter.js"))

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ errorMessage: error.message });
 });

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log("The server is running on Port 9001")
})
