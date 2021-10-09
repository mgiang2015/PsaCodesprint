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
            required: true
        },
        cargoSpace: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

export const Truck = mongoose.model('Truck', truckSchema);
