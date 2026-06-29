import * as mongoose from 'mongoose';

const reportUserSchema = new mongoose.Schema({
    complainant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'A report must belong to a user'],
        index: true
    },
    reporter: {
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

module.exports = mongoose.model('reportuser', reportUserSchema);