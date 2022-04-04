const express = require("express");
const mongoose = require("mongoose");
const user = require("./Models/user")
const axios = require('axios');
require("dotenv").config();
const app = express();
mongoose.connect('mongodb://localhost:27017/SpriterDB');
const {image,imageschema} = require("./Models/image")

const apiKey = process.env.APIKEY;
const pageCount = process.env.PAGECOUNT;
const apiKeyParam ="&client_id="+apiKey;
const pageParam="&page=";
const per_pageParam="&per_page="+pageCount;
const queryParam="&query=";
const ApiURLNoSearch="https://api.unsplash.com/photos?";
const ApiURLSearch="https://api.unsplash.com/search/photos?";


//get without category
app.route("/Images/:page/").get(
    function(req,res)
    {
        
        console.log("No Category requested, getting images from page "+req.params.page)
        var page = req.params.page;
        fetchImagesFromDb(function(result)
        {
            console.log("Fetched result with "+result);
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

app.route("/Image/:id").get(
    function(req,res){
        var id = req.params.id;
        console.log("Getting single image");
        fetchSingleImageFromDb(function(result){
            res.send(result);
            console.log("sending single image "+result);
        },id);
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
            condition = {tags:{$regex:category,$options:'i'}};
        }
        else
        {
            console.log("no category!");
            condition = {tags : {$exists:true, $size:0}};
        }
        image.find(condition).skip(skip).limit(pageCount).exec().then(            
            function(images)
        {
       if(images.length==0)
       {
           console.log("DB is empty seeding with google data!");

            var request = "";
            if(category!=="")
            {
                console.log("appending category");
                request=ApiURLSearch+apiKeyParam+pageParam+page+per_pageParam+queryParam+category;
            }
            else
            {
                request=ApiURLNoSearch+apiKeyParam+pageParam+page+per_pageParam;
            }
            console.log("sending request to"+request);
            axios.get(request)
           .then(function (response) {
               // handle success
               console.log("Fetch Success!");
               var iteration;
               if(category==="")
               {
                console.log("amount of images found: "+response.data);
                iteration=response.data;
               }
               else
               {
                console.log("amount of images found: "+response.data.total);
                iteration=response.data.results;
               }
               iteration.forEach(element => { 
                var webformatURL = element.urls.raw;
                var thumb = element.urls.thumb;
                element.tags = category;
                var update = {};
                if(category !=="")
                {
                    update={$set:{link:webformatURL,thumbNail:thumb},$push:{tags:category}};
                }
                else
                {
                    update={$set:{link:webformatURL,thumbNail:thumb}};
                }
                image.findOneAndUpdate({link:webformatURL},update,{ upsert: true }).then(function(){console.log("upsert complete")}).catch(function(error)
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

function fetchSingleImageFromDb(callback,id)
{
    image.find({_id:id}).exec().then(function(result){
        if(result.length!==0)
        {
            callback(result);
        }
        else
        {
            callback({});
        }
    });
}

app.listen(3000,function(){
    populateDB(1);
    console.log("Server started on port 3000");
  });
