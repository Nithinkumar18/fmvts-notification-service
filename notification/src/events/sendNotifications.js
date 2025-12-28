
require('dotenv').config();
const subNotInfo = require('../constants/notificationInfo');
const logger = require('../loggers/logger');
const amqp = require('amqplib');
const {notifyFM} = require('../mail/mailService');

const subscribeNotificationDetails = async() => {
    let connection,channel;
    try{
      connection = await amqp.connect(process.env.MESSAGE_QUEUE_URL);
      channel = await connection.createChannel();
      logger.info(`SERVICE - ${subNotInfo.SERVICE} - ${process.env.NOTIFICATION_QUEUE} : ${subNotInfo.QUEUE_CONN_SUCESS}`);
      await channel.assertQueue(process.env.NOTIFICATION_QUEUE,{durable: true});
      channel.prefetch(1);
      channel.consume(process.env.NOTIFICATION_QUEUE, async(data) => {
         if(!data) return null;
         let receivedMTsInfo = JSON.parse(data.content.toString());
         if(receivedMTsInfo.eventType === subNotInfo.EVENT_TYPE1){
            logger.info(`SERVICE - ${process.env.NOTIFICATION_QUEUE} : ${subNotInfo.MAINTENANCE_VEHICLES_RECORDS}`);
             await notifyFM(subNotInfo.EVENT_TYPE1,receivedMTsInfo);
             logger.info(`SERVICE - ${process.env.NOTIFICATION_QUEUE} : ${subNotInfo.MAINTENANCE_DATA_NOTIFY}`);
         }
         else{
            logger.info(`SERVICE - ${process.env.NOTIFICATION_QUEUE} : ${subNotInfo.TRIP_DATA}`);
            await notifyFM(subNotInfo.EVENT_TYPE2,receivedMTsInfo);
            logger.info(`SERVICE - ${process.env.NOTIFICATION_QUEUE} : ${subNotInfo.DELAY_DATA_NOTIFY}`);
         }
        channel.ack(data); 
      },
       { noAck: false }
    )
}
    catch(error){
       const code = error.errors?.[0]?.code || error.code || 'UNKNOWN_ERROR';
       logger.error(`SERVICE -  ${subNotInfo.SERVICE} - ${process.env.NOTIFICATION_QUEUE} || ${code}`);    
    }

}

module.exports = {
    subscribeNotificationDetails
}


