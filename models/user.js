const mongoose = require('mongoose');
const passport_local_mongoose = require('passport-local-mongoose');

const UserS = new mongoose.Schema({
image: String,
lists: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }
],
token: String
});
UserS.plugin(passport_local_mongoose);
module.exports = mongoose.model('User', UserS);