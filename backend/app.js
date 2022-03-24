const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb://localhost:27017/SpriterDB');

app.route("/Home").get(
    function(req,res)
    {
        res.send("HELLO WORLD");
    }
)

app.listen(3000,function(){
    console.log("Server started on port 3000");
  });