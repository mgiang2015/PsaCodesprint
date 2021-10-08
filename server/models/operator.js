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
        name: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Operator = mongoose.model('Operator', operatorSchema);
module.exports = Operator;
