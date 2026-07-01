import mongoose, { Schema, Document } from 'mongoose';
import { IPhone } from './Phone';
import { IUser } from './User';
import { REPORT_PHONE_STATUS } from '../utils/constants';

export type ReportPhoneRole = typeof REPORT_PHONE_STATUS;

export interface IReportPhone extends Document {
    phone: string | IPhone;
    user: string | IUser;
    description: string;
    status: ReportPhoneRole;
    createdAt?: Date;
    updatedAt?: Date;
}
const reportPhoneSchema = new Schema({
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
        enum: Object.values(REPORT_PHONE_STATUS),
        default: REPORT_PHONE_STATUS.PENDING,
        index: true
    }
}, {
    timestamps: true
});

const ReportPhone = mongoose.model<IReportPhone>('ReportPhone', reportPhoneSchema);
export default ReportPhone;