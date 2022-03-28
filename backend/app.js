const express = require("express");
const mongoose = require("mongoose");
const image = require("./Models/image")
const axios = require('axios');
require("dotenv").config();
const app = express();
mongoose.connect('mongodb://localhost:27017/SpriterDB');
const apiKey = process.env.APIKEY;

app.route("/Images").get(
    function(req,res)
    {
        image.find({},function(err,images)
        {
            if(images.length==0)
            {
                console.log("DB is empty seeding with google data!");

                axios.get('https://pixabay.com/api/?key='+apiKey)
                .then(function (response) {
                    // handle success
                    console.log("Fetch Success!");
                    console.log(response.data.hits.length);

                    response.data.hits.forEach(element => { 
                        var imageURL = element.pageURL;
                        image.findOneAndUpdate({link:imageURL},{link:imageURL},{ upsert: true }).then(function(){console.log("upsert complete")});
                    });
                  })
                .catch(function (error) {
                    // handle error
                    console.log("Fetch failed!");
                })
                .then(function () {
                    console.log("Seed attempt complete");
                });
            }
            else{
                console.log("db already populated");
            }
        })
        res.send("hello");


    }
)

app.listen(3000,function(){
    console.log("Server started on port 3000");
  });