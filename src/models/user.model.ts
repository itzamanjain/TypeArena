import mongoose, { Model } from 'mongoose';

export interface IUser extends mongoose.Document {
    fullname: string;
    email: string;
    password: string;
    username: string;
    profile: mongoose.Schema.Types.ObjectId;
}

const userSchema = new mongoose.Schema<IUser>({
    fullname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        lowercase: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        email: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,

    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    // profile will contain histroy or something which have all matched played store
    profile:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    }
});


const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
