import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const scheduleSchema = new mongoose.Schema(
    {
        // pickups: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Warehouse'
        //     }
        // ],
        pickups: [
            {
                type: Number
            }
        ],
        // destination: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'Warehouse',
        //     required: true
        // },
        destination: {
            type: Number
        },
        estTotalTime: {
            type: Number
        },

        // path: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Warehouse'
        //     }
        // ],
        path: [
            {
                type: Number
            }
        ],
        // deliverAt: {
        //     type: Date,
        //     required: true
        // },
        // deliverBy: {
        //     type: Date,
        //     required: true
        // },
        deliverAt: {
            type: Number
        },
        deliverBy: {
            type: Number
        },
        // assignedTruck: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'Truck',
        //     required: true
        // },
        distance: {
            type: Number
        }
        // load: {
        //     type: Number
        // }
        // operator: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'Operator',
        //     required: true
        // },
        // cfsAdmin: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'CFSAdmin',
        //     required: true
        // }
    },
    {
        timestamps: true
    }
);

export const Schedule = mongoose.model('Schedule', scheduleSchema);
