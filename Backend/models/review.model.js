const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rideId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ride',
        required: true
    },
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String
    }
}, { timestamps: true });

// Create compound index to ensure one review per ride per reviewer
reviewSchema.index({ rideId: 1, reviewerId: 1 }, { unique: true });

const reviewModel = mongoose.model('review', reviewSchema);

module.exports = reviewModel;