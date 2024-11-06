const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: function () {
            return this.type === 'user';
        }
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'Admins',
        required: function () {
            return this.type === 'admin';
        }
    },
    notifiTitle: {
        type: String,
        required: true
    },
    notifiDescription: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Notifications', NotificationSchema);
