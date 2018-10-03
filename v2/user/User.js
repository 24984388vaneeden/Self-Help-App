
let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
    first: String,
    last: String,
    email: {
        type: String,
        allowNull: false,
        unique: true,
        // validate: {isEmail: {msg: "Email address not valid"}},
    },
    phone: {
        type: String,
        allowNull: true,
        // unique: true,
        // validate: {
        //     len: {args: [7, 20], msg: "Phone number invalid, too short."},
        //     isNumeric: {msg: "not a valid phone number."}
        // }
    },
    password: String
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');