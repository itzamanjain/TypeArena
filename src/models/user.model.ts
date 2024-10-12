import mongoose, { Model } from 'mongoose';

export interface IUser extends mongoose.Document {
    fullname: string;
    email: string;
    password: string;
    username: string;
}

const userSchema = new mongoose.Schema<IUser>({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});


const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
