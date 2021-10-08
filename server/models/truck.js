const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const truckSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        licensePlate: {
            type: String,
            required: true
        },
        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Truck = mongoose.model('Truck', truckSchema);
module.exports = Truck;
