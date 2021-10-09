import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const warehouseSchema = new mongoose.Schema(
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
        }
    },
    {
        timestamps: true
    }
);

export const Warehouse = mongoose.model('Warehouse', warehouseSchema);
