import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

const cfsAdminSchema = new Schema(
    {
        operators: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Operator'
            }
        ],
        trucks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Truck'
            }
        ],
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
        loginType: {
            type: String,
            enum: ['local-admin', 'google'],
            default: 'local-admin'
        },
        stationName: {
            type: String
            // unique: true
        },
        location: {
            type: String
            // unique: true
        },
        phoneNo: {
            type: String
            // unique: true
        }
    },
    {
        timestamps: true
    }
);

cfsAdminSchema.plugin(passportLocalMongoose);

export const CFSAdmin = mongoose.model('CFSAdmin', cfsAdminSchema);
