const express = require('express')
var cors = require('cors')
const ObjectId = require("mongodb").ObjectId
const { MongoClient } = require("mongodb");
require('dotenv').config()



const app = express()
const port =process.env.PORT ||4500

app.use(cors())
app.use(express.json());



const uri = "mongodb+srv://DB_HOST:DB_USER@cluster0.bd1bx.mongodb.net/newdata?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  

client.connect((err) => {
 

  //nailpalish start here

    const Nailpolish_Review = client.db("NailpolishReview").collection("review");

     const Nailpolish_all = client.db("Nailpolish_ALL").collection("all");

      const Nailpolish_buy= client.db("Nailpolish_buy").collection("buy");

       const Nailpolish_admin= client.db("Nailpolish_admin").collection("admin");



      //nailpalish start here


  app.get('/',(req, res) =>{


    res.send('hlw i am excited to learning node');


})
 

    
//lipstick backend start


app.post("/addnailpolish", (req, res) => {
    const event = req.body;
    

   Nailpolish_all.insertMany(event, (err, result) => {
     
      res.send({count:result})
    });
  });

  app.post("/addnailpolishOne", (req, res) => {
    const event = req.body;
    

   Nailpolish_all.insertOne(event, (err, result) => {
     
      res.send({count:result})
    });
  });

  app.get("/addnailpolish", (req, res) => {
    Nailpolish_all.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });



 app.post("/nailpolishReview", (req, res) => {

    const form = req.body;
    

    Nailpolish_Review.insertOne(form, (err, result) => {
     
      res.send({count:result})
    });
  });


app.get("/nailpolishReview", (req, res) => {
    Nailpolish_Review.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });



app.post("/nailpolishbuy", (req, res) => {

    const form = req.body;
    

    Nailpolish_buy.insertOne(form, (err, result) => {
     
      res.send({count:result})
    });
  });

  app.get("/nailpolishbuy", (req, res) => {
    Nailpolish_buy.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });


 app.get("/nailpolishbuy/:email", (req, res) => {

   email = req.params.email
  


    Nailpolish_buy.find({email:email}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.delete(`/nailpolishbuydelete/:id`,(req,res)=>{
     const id =req.params.id;
    
     
     Nailpolish_buy.deleteOne({_id:ObjectId(id)},(err)=>{
       if(!err){
         res.send({count:1})
       }
     })

   })

   app.delete(`/nailpolishdeleteProduct/:id`,(req,res)=>{
     const id =req.params.id;
    
     
    Nailpolish_all.deleteOne({_id:ObjectId(id)},(err)=>{
       if(!err){
         res.send({count:1})
       }
     })

   })

   app.post("/nailpolishAdmin", (req, res) => {

    const form = req.body;
    

    Nailpolish_admin.insertOne(form, (err, result) => {
     
      res.send({count:result})
    });
  });


  app.get("/nailpolishAdmin1", (req, res) => {

       Nailpolish_admin.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

 
  app.patch("/nailpolishProcess/:id", (req, res) => {

     const id = req.params.id;
     
     
     
     
    Nailpolish_buy.updateOne({_id:ObjectId(id)},
    {
      $set: {value : "Shipped"}
    })
    .then(result =>{
       res.send(result);
      

    })

  })
    


//lipstick backend finish






})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
