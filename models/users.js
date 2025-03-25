import mongoose, {model} from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

// export default model('user', userSchema);
/**
 * Creates indexes on the User model and exports the model as the default export.
 * This allows the User model to be imported and used in other parts of the app.
**/

const User = model('user', userSchema);
User.createIndexes();
export default User;