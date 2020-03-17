const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gram: {
        type: Number,
        required: true
    },
    cho: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Food', FoodSchema); //exportação padrão