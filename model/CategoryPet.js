const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const categoryPet = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
    },
});
module.exports = mongoose.models.categoryPet || mongoose.model('categoryPet', categoryPet);
// category -----> categories