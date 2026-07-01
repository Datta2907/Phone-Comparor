import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { REPORT_USER_STATUS } from '../utils/constants';

export type ReportUserRole = typeof REPORT_USER_STATUS;

export interface IReportUser extends Document {
    complainant: string | IUser;
    reporter: string | IUser;
    description: string;
    status: ReportUserRole;
    createdAt?: Date;
    updatedAt?: Date;
}

const reportUserSchema = new Schema({
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
        enum: Object.values(REPORT_USER_STATUS),
        default: REPORT_USER_STATUS.PENDING,
        index: true
    }
}, {
    timestamps: true
});

const ReportUser = mongoose.model<IReportUser>('ReportUser', reportUserSchema);
export default ReportUser;