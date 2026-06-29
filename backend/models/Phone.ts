import * as mongoose from 'mongoose';

const phoneSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Phone', phoneSchema);