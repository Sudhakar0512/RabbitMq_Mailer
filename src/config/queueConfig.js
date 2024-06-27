const amqp=require('amqplib')

let connection,channel;
async function connectQueue(){
    try {
         connection = await amqp.connect("amqp://localhost");
         channel =await connection.createChannel();
        const queue=await channel.assertQueue("jobs");
        // setTimeout(()=>{
        //    console.log("hello");
        // },8000)
        channel.consume("jobs",(data)=>{
          console.log(`${Buffer.from(data.content)}`)
          channel.ack(data);
        })

    } catch (error) {
        console.log(error);
    }   
}

module.exports={
    connectQueue
}