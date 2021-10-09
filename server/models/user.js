import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema(
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

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export const User = mongoose.model('User', userSchema);
