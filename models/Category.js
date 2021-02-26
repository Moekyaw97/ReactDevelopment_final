const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    keywords: {
        type: String,
        required: true
    },
    featured: {
        type: String,
        required: true
    },
    title_mm: {
        type: String,
        required: true
    },
    parent_id: {
        type: String,
        required: true
    }
});

CategorySchema.virtual('id').get(function(){
    return this._id.toHexString();
});

CategorySchema.set('toJSON', {
    virtuals: true
});

module.exports = Categories = mongoose.model("categories", CategorySchema);
