const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({

    eventId: {
        type: String,
        required: true
    },

    eventType: {
        type: String,
        required: true
    },

    recipient: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    }


}, { timestamps: true });

module.exports = mongoose.model("notification", notificationSchema);