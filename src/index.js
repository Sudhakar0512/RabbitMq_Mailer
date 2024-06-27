const express = require('express');
const amqp=require('amqplib')
const {EmailService}=require('./services')

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const mailSender=require("./config/emailconfig");
const serverConfig = require('./config/server-config');
const { Json } = require('sequelize/lib/utils');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api', apiRoutes);


async function connectQueue(){
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel =await connection.createChannel();
        const queue=await channel.assertQueue("jobs");
        // setTimeout(()=>{
        //    console.log("hello");
        // },8000)
        channel.consume("jobs",async(data)=>{
            // const object =JSON.parse(data);
            const object = JSON.parse(data.content.toString());
            await EmailService.sendEmail(serverConfig.GMAIL_EMAIL,object.recepientEmail,object.subject,object.content)
          console.log(`${Buffer.from(data.content)}`)
          
          channel.ack(data);
        })

    } catch (error) {
        console.log(error);
    }   
}

app.listen(ServerConfig.PORT, async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    await connectQueue();
    console.log("Queue connected");
    // try{
    //     const response=await mailSender.sendMail({
    //         from:serverConfig.GMAIL_EMAIL,
    //         to:'sudhakars0512@gmail.com',
    //         subject:"Is it working! RabbitMq project?",
    //         text:"Yes Workingg bro"
    //     });
    //     console.log(response);
    // }
    // catch(e)
    // {
    //    console.log(e); 
    // }
});
