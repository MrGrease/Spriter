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
app.route("/Images/:page/").get(
    function(req,res)
    {
        console.log("No Category requested, getting images from page "+req.params.page)
        var page = req.params.page;
        fetchImagesFromDb(function(result)
        {
            console.log("Fetched result with "+result.length);
            res.set('Access-Control-Allow-Origin', '*');
            res.send(result);
        },page,"")
    }
)

app.route("/Images/:category/:page/").get(
    function(req,res)
    {
        var category = req.params.category;
        var page = req.params.page;
        console.log("category is " +category);
        console.log("getting images from page "+req.params.page)
        fetchImagesFromDb(function(result)
        {
            if(result){
            console.log("Fetched result with "+result.length);
            res.set('Access-Control-Allow-Origin', '*');
            res.send(result);
            }
            else{
                res.send({});
            }
        },page,category)
    }
)


//get with category

function populateDB(page,category="")
{    
    if(category !== ""){
    console.log("populating db with images from category "+category);
    }

    return populatePromise = new Promise(function(success,failed){
        var skip = (page-1)*pageCount;
        console.log("populating page "+page+" category: "+category);
        var condition = {};
        if(category !=="")
        {
            console.log("category exists!")
            condition = {$or:[{tags:{$regex:category,$options:'i'}},{link:{$regex:category,$options:'i'}}]};
        }
        image.find(condition).skip(skip).limit(pageCount).exec().then(            
            function(images)
        {
       if(images.length==0)
       {
           console.log("DB is empty seeding with google data!");

            var request = 'https://pixabay.com/api/?key='+apiKey+"&page="+page;
            if(category!=="")
            {
                console.log("appending category");
                request+="&q="+category;
            }
            console.log("sending request to"+request);
            axios.get(request)
           .then(function (response) {
               // handle success
               console.log("Fetch Success!");
               console.log("amount of images found: "+response.data.hits.length);
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
               console.log(error);
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

function fetchImagesFromDb(callback,pages,category="",initial=true)
{
    var condition = {};
    if(category !=="")
    {
        console.log("category exists!")
        condition = {$or:[{tags:{$regex:category,$options:'i'}},{link:{$regex:category,$options:'i'}}]};
    }
    if(pages==1)
    {
        image.find(condition).limit(pageCount).exec().then(function(result){
            if(result.length==0)
            {
                console.log("result is empty calling fetch");
                if(initial){
                populateDB(pages,category).then(function(){
                    fetchImagesFromDb(callback,pages,category,false);
                },function(result){callback({});}); 
                }
                else
                {
                    console.log("no images!");
                    callback({});
                }
            }
            else
            {
                callback(result);
            }
        });
    }
    else
    {
        var skip = (pages-1)*pageCount;
        image.find(condition).skip(skip).limit(pageCount).exec().then(            
        function(result)
        {
            if(result.length==0)
            {
                console.log("result is empty calling fetch");
                populateDB(pages,category).then(function(){
                    fetchImagesFromDb(callback,pages,category);
                },function(result){callback(result);}); 
            }
            else
            {
                callback(result);
            }
        });
    }
}

app.listen(3000,function(){
    populateDB(1);
    console.log("Server started on port 3000");
  });
