const ampq=require("amqplib");

let connect,channel;

async function connection(){
    try{
       connect =await ampq.connect("amqp://localhost:5672");
       channel =await connect.createChannel();
       const queue =await channel.assertQueue("jobs");
       console.log("Queue connected");
    //    setInterval(()=>{
    //    },1000)
    //    console.log(`Jobs sent successfully: ${msg}`);
    }
    catch(e)
    {
        console.log("Queue Not connected");
        console.log(e);
    }
}

async function sendData(msg){
    try {
        channel.sendToQueue("jobs",Buffer.from(JSON.stringify(msg)));       
        
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    connection,
    sendData
}
