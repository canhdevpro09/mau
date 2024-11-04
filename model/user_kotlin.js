const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const user_kotlin = new Schema({
    id: { type: ObjectId }, //khóa chính
    email: { type: String },
    username: { type: String },
    password: { type: String },
});
module.exports = mongoose.models.user_kotlin || mongoose.model('user_kotlin', user_kotlin);