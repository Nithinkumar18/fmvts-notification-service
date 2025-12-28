const notificationService = require('../service/notificationService');
const logger = require('../loggers/logger');
const notifyCtrInfo = require('../constants/notificationInfo');
const httpConstants = require('../constants/statusConstants');


const viewNotificationsByEventType = async(req,res) => {
    try{
        logger.info(` SERVICE - ${notifyCtrInfo.SERVICE} : ${req.url}`);
        const processedNotifications = await notificationService.notificationsByEventType();
        return res.status(httpConstants.SUCCESS).json({Event:notifyCtrInfo.VIEW_NOTIFICATIONS_BY_EVENTTYPE,processedNotifications});


    }
    catch(err){
        return res.status(httpConstants.INTERNAL_SERVER_ERROR).json({Event:notifyCtrInfo.VIEW_NOTIFICATIONS_BY_EVENTTYPE_ERR,ErrorMessage:err.message});
    }
}


const viewEventsByTypeInLastQuarter = async(req,res) => {
    try{
         const eventTpe = req.params.event;
         const events = await notificationService.eventsProcessedInLastQuarter(eventTpe);
         if(events.length > 0){
            return res.status(httpConstants.SUCCESS).json({Event:notifyCtrInfo.EVENTS_LAST_QUARTER,events});
         }
         else{
             return res.status(httpConstants.SUCCESS).json({Event:notifyCtrInfo.EVENTS_LAST_QUARTER_NF});
         }
    }
    catch(err){
            return res.status(httpConstants.INTERNAL_SERVER_ERROR).json({Event:notifyCtrInfo.EVENTS_LAST_QUARTER_ERROR,Error:err.message});
    }
}
module.exports = {
    viewNotificationsByEventType,
    viewEventsByTypeInLastQuarter
}