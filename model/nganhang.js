const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const nganhang = new Schema({
    id: { type: ObjectId }, //khóa chính
    code: { type: String },
    link: { type: String },
    date: { type: Date },
});
module.exports = mongoose.models.nganhang || mongoose.model('nganhang', nganhang);
// product -----> products
