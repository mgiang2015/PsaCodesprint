import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const requestSchema = new mongoose.Schema(
    {
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        },
        origin: {
            type: Schema.Types.ObjectId,
            ref: 'Warehouse',
            required: true
        },
        destination: {
            type: Schema.Types.ObjectId,
            ref: 'Warehouse',
            required: true
        },
        load: {
            type: Number,
            required: true
        },
        operator: {
            type: Schema.Types.ObjectId,
            ref: 'Operator',
            required: true
        },
        cfsAdmin: {
            type: Schema.Types.ObjectId,
            ref: 'CFSAdmin',
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Request = mongoose.model('Request', requestSchema);
