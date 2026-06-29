import * as mongoose from 'mongoose';

const reportPhoneSchema = new mongoose.Schema({
    phone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phone',
        required: [true, 'A report must belong to a specific phone'],
        index: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A report must belong to a user']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for the report'],
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'resolved'],
        default: 'pending',
        index: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ReportPhone', reportPhoneSchema);