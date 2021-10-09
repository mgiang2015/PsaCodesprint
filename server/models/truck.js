import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const truckSchema = new mongoose.Schema(
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
        }
    },
    {
        timestamps: true
    }
);

export const Truck = mongoose.model('Truck', truckSchema);
// module.exports = Truck;
