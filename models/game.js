const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    developer: {
        type: String
    },
    year: {
        type: Number
    },
    multiplayer: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        unique: true,
        maxlength: [300, 'You have exceeded the max length of 300 characters.']
    },
    imageUrl: {
        type: String,
        unique: true,
        required: true
    }
})

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;