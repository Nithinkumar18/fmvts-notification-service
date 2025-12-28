const notification = require('../model/notification');
const notifyServiceLog = require('../loggers/logger');
const notifyServiceInfo = require('../constants/notificationInfo');


const createNotificationRecord = async(notifyData) => {
    try{
       const notifyRecUp = await notification.create(notifyData);
       if(notifyRecUp._id){
          notifyServiceLog.info(`SERVICE - ${notifyServiceInfo.SERVICE} :${notifyServiceInfo.NOTIFICATION_RECORD_CREATED}`);
          return notifyRecUp;
       }
    }
    catch(error){
        throw error;
    }
}


const notificationsByEventType = async() => {
    try{

         let notification_Sent = {
            maintenance_due:0,
            trip_delayed:0
        }
        const notifications = await notification.aggregate([
            {

                $match: {
                    status: "SENT"
                },
            },
            {
                $group: {
                    _id: "$eventType",
                    notificationProcessed: { $sum: 1 }
                }
            }
        ]);
        notifications.forEach((notified) => {
            if(notified._id === notifyServiceInfo.EVENT_TYPE1){
                notification_Sent.maintenance_due = notified.notificationProcessed;
            }
            else{
                notification_Sent.trip_delayed = notified.notificationProcessed;
            }
        })
        return notification_Sent;
    }
    catch(error){
        throw error;
    }
}


const eventsProcessedInLastQuarter = async(event) => {
    try{
        let date_range1 = new Date();
        let date_range2 = new Date(date_range1);
            date_range2.setDate(date_range1.getDate() - 90);
           
        const eventsInLastQuarter = await notification.aggregate([{
            $match: {
                $and: [
                    {
                        eventType: `${event}`
                    },
                    {
                        createdAt:
                        {
                            $lte: date_range1,
                            $gte: date_range2
                        }
                    }
                ]
            }
        },
        {
            $group: {
                _id: "$eventId",

            }
        }
        ]);
       
        return eventsInLastQuarter;
    }
    catch(error){
        throw error;
    }
}
module.exports = {
    createNotificationRecord,
    notificationsByEventType,
    eventsProcessedInLastQuarter
}