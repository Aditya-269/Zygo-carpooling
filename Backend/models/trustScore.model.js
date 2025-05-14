const mongoose = require('mongoose');

const trustScoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const trustScoreModel = mongoose.model('trustScore', trustScoreSchema);

module.exports = trustScoreModel;