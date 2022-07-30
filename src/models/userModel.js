const mongoose = include('config/database');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    }

}, {
    timestamps: true
});
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;