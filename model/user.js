const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const user = new Schema({
    id: { type: ObjectId }, //khóa chính
    email: { type: String },
    password: { type: String },
    address: { type: String },
    phone: { type: String }, 
});
module.exports = mongoose.models.user || mongoose.model('user', user);
