const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
    title: { type: String,minLength: 10, maxLength: 50, required: true },
    content: { type: String,minLength: 20, maxLength: 1000, required: true },
    date: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, min: 1, required: true },
    localization: { type: String, required: true },
    user: { type: String, required: true },
    phone: { type: Number, required: true },
});
adSchema.index({ '$**': 'text' });

module.exports = mongoose.model('Ads', adsSchema);