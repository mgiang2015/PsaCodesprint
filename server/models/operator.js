const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operatorSchema = new mongoose.Schema(
    {
        warehouses: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Warehouse'
            }
        ],
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            default: ''
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        loginType: {
            type: String,
            enum: ['local', 'google'],
            default: 'local'
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Operator = mongoose.model('Operator', operatorSchema);
module.exports = Operator;
