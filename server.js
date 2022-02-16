var express = require("express");
var mongoose =require("mongoose");
var cookie = require("cookie-parser");
var bodyparser = require("body-parser");
var multer = require("multer");

var app= express();
mongoose.connect("mongodb://localhost:27017/edoc");
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.on("open", () => console.log("connection established"));

app.use(express.json());
app.use((res, req, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method == "OPTIONS") {
        res.header("Access-control-allow-methods", "POST,GET,PUT,PATCH,DELETE");
        return res.status(200).json({});
    }
    next();
});
app.get("/", function(req, res){
    res.send("Hello Welcome to E-Doc Mangement System.");
    res.end();
});

app.use("/authentication", require("./routes/authentication"));

app.use("/documents", require("./routes/documents"));
app.use("/documents", require("./routes/documents"));
app.use("/words", require("./routes/words"));
app.use("/employees", require("./routes/employees"));


app.listen(8081, function(){
    console.log("Node Server Started");
})