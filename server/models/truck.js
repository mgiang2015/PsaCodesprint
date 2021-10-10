import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const truckSchema = new Schema(
    {
        firstName: {
            type: String,
            default: ''
        },
        lastName: {
            type: String,
            default: ''
        },
        licensePlate: {
            type: String,
            required: true,
            unique: true
        },
        cargoSpace: {
            type: Number,
            default: 0
        },
        cfsAdmin: {
            type: Schema.Types.ObjectId,
            ref: 'CFSAdmin',
            required: true
        }
        // schedules: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Schedule'
        //     }
        // ]
    },
    {
        timestamps: true
    }
);

export const Truck = mongoose.model('Truck', truckSchema);
