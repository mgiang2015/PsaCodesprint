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
        schedules: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Schedules'
            }
        ],
        username: {
            type: String,
            required: true,
            unique: true
        },
        loginType: {
            type: String,
            enum: ['local-admin', 'google'],
            default: 'local'
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
