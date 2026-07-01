import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IPhone extends Document {
    name: string;
    network: string;
    photo: string;
    launch: string;
    dimensions: string;
    sims: string;
    display: string;
    size: string;
    resolution: string;
    os: string;
    chipset: string;
    gpu: string;
    cpu: string;
    storage: string;
    frontcamera: string;
    backcamera: string;
    video: string;
    battery: string;
    colors: string;
    createdBy: string | IUser
}

const phoneSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Phone name is required'],
        trim: true,
        unique: true,
        index: true
    },
    network: { type: String, required: true },
    photo: { type: String, required: true },
    launch: { type: String, required: true },
    dimensions: { type: String, required: true },
    sims: { type: String, required: true },
    display: { type: String, required: true },
    size: { type: String, required: true },
    resolution: { type: String, required: true },
    os: { type: String, required: true },
    chipset: { type: String, required: true },
    gpu: { type: String, required: true },
    cpu: { type: String, required: true },
    storage: { type: String, required: true },
    frontcamera: { type: String, required: true },
    backcamera: { type: String, required: true },
    video: { type: String, required: true },
    battery: { type: String, required: true },
    colors: [{ type: String }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Phone = mongoose.model<IPhone>('Phone', phoneSchema);
export default Phone;