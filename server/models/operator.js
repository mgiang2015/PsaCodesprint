import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

const operatorSchema = new Schema(
    {
        warehouses: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Warehouse'
            }
        ],
        requests: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Request'
            }
        ],
        // schedules: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Schedule'
        //     }
        // ],
        username: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String
        },
        details: {
            type: String
        },
        loginType: {
            type: String,
            enum: ['local-operator', 'google'],
            default: 'local-operator'
        },
        cfsAdmin: {
            type: Schema.Types.ObjectId,
            ref: 'CFSAdmin'
        }
    },
    {
        timestamps: true
    }
);

operatorSchema.plugin(passportLocalMongoose);

export const Operator = mongoose.model('Operator', operatorSchema);
