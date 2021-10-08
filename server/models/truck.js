const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operatorSchema = new mongoose.Schema(
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

const Operator = mongoose.model('Operator', operatorSchema);
module.exports = Operator;
