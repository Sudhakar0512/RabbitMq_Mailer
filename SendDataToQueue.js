const express= require('express');
const {connection,sendData} = require("./queueConfig")
const bodyParser = require('body-parser');

const app=express();
app.use(bodyParser.json());

app.get("/test",(req,res)=>{
    res.send("Demo")
})

app.get("/sendData",async (req,res)=>{
    try {
        // const {subject,content,recepientEmail}=req.body();
        await sendData({
            subject:"Test Data...",
            content:"Test Message",
            recepientEmail:"sudhakars0512@gmail.com"  
          })
          res.send("Mail Send Successfully");   
        
        console.log("data successfully send to queue!")
    } catch (error) {
        res.send("Not ok");   

        console.log(error);
    }
      
})


app.post("/sendData",async (req,res)=>{
    try {
        const {subject,content,recepientEmail}=req.body;
        await sendData({
            subject,content,recepientEmail
          })
          res.send(req.body);   
 
        
        console.log("data successfully send to queue!")
    } catch (error) {
        res.send("Error on sending Data");   
        console.log(error);
    }
      
})


app.listen(8080,async()=>{
    console.log("Applicatio listerning on 8080");
    await connection();
    
})
