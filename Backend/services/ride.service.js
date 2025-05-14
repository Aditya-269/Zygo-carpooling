const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


module.exports.createRide = async ({
    user, pickup, destination, vehicleType, tags
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
        tags: {
            petsAllowed: tags?.petsAllowed || false,
            noSmoking: tags?.noSmoking || true,
            expressRoute: tags?.expressRoute || false,
            acVehicle: tags?.acVehicle || true,
            ladiesOnly: tags?.ladiesOnly || false
        }
    })

    return ride;
}

