const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const productPet = new Schema({
    id: { type: ObjectId }, //khóa chính
    name: { type: String },
    price: { type: Number },
    age: { type: Number },
    image: { type: String },
    breed: { type: String },
    category: { type: ObjectId, ref: 'categoryPet' } //khóa ngoại
});
module.exports = mongoose.models.productPet || mongoose.model('productPet', productPet);
// product -----> products
