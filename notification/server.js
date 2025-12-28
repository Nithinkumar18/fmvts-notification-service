const mongoose = require('mongoose');
const express = require('express');
const logger = require('./src/loggers/logger');
require('dotenv').config();
const nftsInfo = require('./src/constants/notificationInfo');
const {subscribeNotificationDetails} = require('./src/events/sendNotifications');
const notificationRoutes = require('./src/routes/notificationRoutes');

const app = express();
app.use(express.json());
app.use('/v1/notifications',notificationRoutes);
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
     logger.info(`${nftsInfo.SERVICE} connected to database ✅`)
    app.listen(PORT,() => {
    logger.info(`SERVICE - ${nftsInfo.SERVICE} started on ${PORT} 📧`);
    })
    subscribeNotificationDetails();
})
.catch((err) => {
    logger.error(`${nftsInfo.SERVICE} failed  to connect  database : ${err.message}`);
})



