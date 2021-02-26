const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PriceSchema = new Schema({
 /*   category_id: {
        type: Mongoose.Schema.parent_id,
            ref: `categories`
    },*/
    category_id: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    uom: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    featured: {
        type: String,
        required: true
    },
    entry_date: {
        type: Date,
        default: Date.now
    }
   
});

PriceSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

PriceSchema.set('toJSON', {
    virtuals: true
});

module.exports = Price = mongoose.model("prices", PriceSchema);