const mongoose = require('mongoose');

const motoSchema = new mongoose.Schema({
    id: { type: Number, required: true, index: true },
    url: String,
    brandId: Number,
    brandName: String,
    modelId: Number,
    modelName: String,
    year: Number,
    city: String,
    price: Number,
    engineType: String,
    engineCapacity: String,
    lastSeen: { 
        type: Date, 
        default: Date.now, 
        expires: '2d'
    }
}, { timestamps: true });

module.exports = mongoose.models.Moto || mongoose.model('moto', motoSchema);