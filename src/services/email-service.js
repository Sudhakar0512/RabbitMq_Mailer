const {TicketRepository} =require("../repositories");

const {MAILER} = require('../config')
const ticketRepo = new TicketRepository();

async function sendEmail(mailFrom,mailTo,subject,text){
    try{
        const response=await MAILER.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:subject,
            text:text
        })
        console.log("Mail Successfully sended")
        return response;


        // const response=await mailSender.sendMail({
            //         from:serverConfig.GMAIL_EMAIL,
            //         to:'sudhakars0512@gmail.com',
            //         subject:"Is it working! RabbitMq project?",
            //         text:"Yes Workingg bro"
            //     });
            //     console.log(response);
    }
    catch(e)
    {
        console.log(e);
        throw e;
    }
}

async function createTicket(data){
    try{
       const respone = await ticketRepo.create(data);
       return respone;
    }
    catch(e)
    {
        console.log(e);
        throw e;
    }
}

async function getPenfingEmails(){
    try{
       const response=await ticketRepo.getPenfingEmails();
       return response;
    }
    catch(e)
    {
        console.log(e);
        throw e;
    }
}

module.exports={
   sendEmail,
   createTicket,
   getPenfingEmails
}