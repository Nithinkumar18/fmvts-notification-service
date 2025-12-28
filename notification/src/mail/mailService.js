const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const logger = require('../loggers/logger');
const mailInfo = require('../constants/notificationInfo');
require('dotenv').config();
const notificationService = require('../service/notificationService');



const transporter = nodemailer.createTransport({

    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, 
    auth:{
        user: process.env.EMAIL_USER_KEY,
        pass: process.env.EMAIL_PASS_KEY
    },
    tls:{
        rejectUnauthorized: false
    }
})


function renderTemplate(templateName,data){

    const filePath = path.join(__dirname, 'templates', `${templateName}.hbs`);
    const source = fs.readFileSync(filePath,"utf-8");
    const template = handlebars.compile(source);
    return template(data);

}

async function notifyFM(type,payload) {

    let subject;
    let template;
    let templateData;

    if(type === mailInfo.EVENT_TYPE1){
        subject = mailInfo.EVENT_TYPE1;
        template = 'maintenance'
        templateData = {
       maintenanceData: payload.maintenanceData 
       };
    }
    else{
        
        subject = mailInfo.EVENT_TYPE2;
        template = 'tripDelay'
          templateData = {
          tripId: payload.data.tripId,
          vehicleId: payload.data.VehicleRegNum,
          delay: payload.data.delayTime
    };
    }
 
    const html = renderTemplate(template,templateData);
    const notificationAck = await transporter.sendMail({
        from: 'FMVTS-Admin <example@gmail.com>', // add your email here
        to: `${mailInfo.SAMPLE_FM_EMAIL}`,
        subject,
        html
    });
    if(notificationAck.messageId)
    {
      logger.info(`${mailInfo.NOTIFICATION_SENT_OK}- ${notificationAck.messageId}`);
      const notificationRecord = {
         eventId: payload.eventId,
         eventType: payload.eventType,
         recipient: mailInfo.SAMPLE_FM_EMAIL,
         status: mailInfo.NOTIFICATION_STATUS
         }
    const nrecup =  await notificationService.createNotificationRecord(notificationRecord);
    if(nrecup._id){
        logger.info(`SERVICE - ${mailInfo.SERVICE} :${mailInfo.NOTIFICATION_OK_RECORD} : ${nrecup._id}`);
    }
    else{
        logger.info(`SERVICE - ${mailInfo.SERVICE} :${mailInfo.NOTIFICATION_OK_RECORD_FAIL}`)
    }

    }
    else{
       logger.info(`${mailInfo.NOTIFICATION_SENT_NOT_OK}- ${notificationAck?.error}`);
       const notificationUnsuccessRecord = {
         eventId: payload.eventId,
         eventType: payload.eventType,
         recipient: mailInfo.SAMPLE_FM_EMAIL,
         status: mailInfo.NOTIFICATION_FAIL_STATUS
         }
         const fnotifyrecord = await notificationService.createNotificationRecord(notificationUnsuccessRecord);
         if(fnotifyrecord._id){
            logger.info(`SERVICE - ${mailInfo.SERVICE} :${mailInfo.NOTIFICATION_NOT_OK_RECORD} : ${nrecup._id}`);
         }
         else{
            logger.info(`SERVICE - ${mailInfo.SERVICE} :${mailInfo.NOTIFICATION_NOT_OK_RECORD_FAIL}`);
         }
    }
}

module.exports ={notifyFM}