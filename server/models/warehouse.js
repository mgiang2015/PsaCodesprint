import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const warehouseSchema = new Schema(
    {
        level: {
            type: Number,
            min: 1,
            max: 2
        },
        block: {
            type: Number,
            required: true
        },
        unitNo: {
            type: Number,
            required: true
        },
        cfsAdmin: {
            type: Schema.Types.ObjectId,
            ref: 'CFSAdmin',
            required: true
        },
        operator: {
            type: Schema.Types.ObjectId,
            ref: 'Operator',
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Warehouse = mongoose.model('Warehouse', warehouseSchema);
