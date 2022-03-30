const express = require("express");
const mongoose = require("mongoose");
const image = require("./Models/image")
const axios = require('axios');
require("dotenv").config();
const app = express();
mongoose.connect('mongodb://localhost:27017/SpriterDB');
const apiKey = process.env.APIKEY;
const pageCount = process.env.PAGECOUNT;

//get without category
app.route("/Images/:page").get(
    function(req,res)
    {
        console.log("getting images from page "+req.params.page)
        var page = req.params.page;
        
        fetchImagesFromDb(page,function(result)
        {
            console.log(result);
            res.set('Access-Control-Allow-Origin', '*');
            res.send(result);
        })
    }
)

//get with category
app.listen(3000,function(){
    populateDB(1);
    console.log("Server started on port 3000");
  });

function populateDB(page)
{    
    return populatePromise = new Promise(function(success,failed){
        var skip = (page-1)*pageCount;
        console.log("populating page "+page);
        image.find({}).skip(skip).limit(pageCount).exec().then(            
            function(images)
        {
       if(images.length==0)
       {
           console.log("DB is empty seeding with google data!");
            axios.get('https://pixabay.com/api/?key='+apiKey+"&page="+page)
           .then(function (response) {
               // handle success
               console.log("Fetch Success!");
               console.log("Images found: "+response.data.hits.length);
                response.data.hits.forEach(element => { 
                   var webformatURL = element.webformatURL;
                   element.tags = element.tags.split(",");
                   image.findOneAndUpdate({link:webformatURL},{link:webformatURL,tags:element.tags},{ upsert: true }).then(function(){console.log("upsert complete")}).catch(function(error)
                   {
                       console.log("db error!" + error);
                   });
               });
               success();
             })
           .catch(function (error) {
               // handle error
               console.log("Fetch failed!");
               failed();
           })
           .then(function () {
               console.log("Seed attempt complete");
           });
       }
       else{
           console.log("db already populated");
           success();
       }
     })
    })
}

function fetchImagesFromDb(pages,callback)
{
    if(pages==1)
    {
        image.find({}).limit(pageCount).exec().then(function(result){callback(result);});
    }
    else
    {
        var skip = (pages-1)*pageCount;
        image.find({}).skip(skip).limit(pageCount).exec().then(            
        function(result)
        {
            if(result.length==0)
            {
                console.log("result is empty calling fetch");
                populateDB(pages).then(function(){
                    fetchImagesFromDb(pages,callback);
                },function(result){callback(result);}); 
            }
            else
            {
                callback(result);
            }
        });
    }
}