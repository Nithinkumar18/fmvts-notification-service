const notificationsInfo = {

    SERVICE: "FMVTS-Notification-Service",
    QUEUE_CONN_SUCESS: "Queue connection successfull",
    MAINTENANCE_VEHICLES_RECORDS: "Maintenance vehicles records has been received from maintenance Service",
    TRIP_DATA: "Data for delayed trip has been received from trip service",
    EVENT_TYPE1: "MAINTENANCE_DUE",
    EVENT_TYPE2: "TRIP_DELAYED",
    MAINTENANCE_DATA_NOTIFY:"Maintenance data sent successfully to auto-mailer",
    DELAY_DATA_NOTIFY: "Delayed trip data sent successfully to auto-mailer",
    NOTIFICATION_SENT_OK: "Notification sent to respective Fleet Manager successfullly",
    NOTIFICATION_SENT_NOT_OK: "Unable to notify respective Fleet Manager",
    NOTIFICATION_STATUS:"SENT",
    NOTIFICATION_FAIL_STATUS:"FAILED",
    // SAMPLE_FM_EMAIL: added to test the email service
    NOTIFICATION_RECORD_CREATED:"Notification record has regestred successfully",
    NOTIFICATION_OK_RECORD: "Event of notification with success status has been processed with id",
    NOTIFICATION_OK_RECORD_FAIL: "Unable to process Event notification with success status due to",
    NOTIFICATION_NOT_OK_RECORD_FAIL: "Unable to process Event of notification with fail status due to",
    NOTIFICATION_NOT_OK_RECORD: "Event of notification with fail status has been processed with id",
    VIEW_NOTIFICATIONS_BY_EVENTTYPE: "Notifications processed by eventType",
    VIEW_NOTIFICATIONS_BY_EVENTTYPE_ERR: "Unable to view notifications by eventType",
    ACCESS_DENIED: "You do not have the required permissions to perform this action; please contact support or an administrator for assistance if you believe this is an error",
    ROLE_VALIDATION_FAIL: "user role validation failed",
    ERROR_VALIDATING_ROLE: "Role validation failed due to issue at server Please try again after some time",
    ROLE_VALIDATION: "user role validation success",
    EVENTS_LAST_QUARTER_NF:"No notification events were found for the given eventType in the last quarter",
    EVENTS_LAST_QUARTER: "Notifications events processed for the given eventType in last quarter are as follows",
    EVENTS_LAST_QUARTER_ERROR: "Unable to fetch notification events in the last quarter for given eventType"

}

module.exports = notificationsInfo;