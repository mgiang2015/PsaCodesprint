import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const scheduleSchema = new mongoose.Schema(
    {
        deliverAt: {
            type: Date,
            required: true
        },
        deliverBy: {
            type: Date,
            required: true
        },
        assignedTruck: {
            type: Schema.Types.ObjectId,
            ref: 'Truck',
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

export const Schedule = mongoose.model('Schedule', scheduleSchema);
