const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Duan = new Schema({
    id: { type: ObjectId }, //khóa chính
    name: { type: String },
    department: { type: String },
    date: { type: Date },
});
module.exports = mongoose.models.Duan || mongoose.model('Duan', Duan);
