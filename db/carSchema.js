const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    url: String,
    brandId: Number,
    brandName: String,
    modelId: Number,
    modelName: String,
    generationId: Number,
    generationName: String,
    year: Number,
    city: String,
    price: Number,
    engineType: String,
    engineCapacity: String,
    transmission: String,
    type: String,
    lastSeen: { 
        type: Date, 
        default: Date.now, 
        expires: '2d'
    }
}, { timestamps: true });

module.exports = mongoose.models.Car || mongoose.model('Car', carSchema);