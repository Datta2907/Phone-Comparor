import mongoose, { Schema, Document } from 'mongoose';
import { ROLES } from '../utils/constants';

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password?: string;
    provider: string;
    providerId: string;
    role: string;
    avatar: string;
    createdAt: Date;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    provider: {
        type: String,
        enum: ['local', 'google', 'facebook', 'apple'],
        default: 'local'
    },
    providerId: {
        type: String,
        index: true
    },
    role: {
        type: String,
        enum: [ROLES.ADMIN, ROLES.PREMIUM, ROLES.CLIENT],
        default: ROLES.CLIENT
    },
    avatar: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;