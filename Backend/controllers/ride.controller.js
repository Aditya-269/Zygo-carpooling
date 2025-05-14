const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const rideModel = require('../models/ride.model');


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType, tags } = req.body;

    try {
        const ride = await rideService.createRide({ 
            user: req.user._id, 
            pickup, 
            destination, 
            vehicleType,
            tags: {
                petsAllowed: tags?.petsAllowed || false,
                noSmoking: tags?.noSmoking || true,
                expressRoute: tags?.expressRoute || false,
                acVehicle: tags?.acVehicle || true,
                ladiesOnly: tags?.ladiesOnly || false
            }
        });
        res.status(201).json(ride);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};







