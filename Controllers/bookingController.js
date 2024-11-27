const User = require("../Models/UserModel");
const Vehicle = require("../Models/vehicleModel");
const Booking = require("../Models/bookingModels");
const { io } = require("../app");
const { findBestDriver } = require("../helpers/matchingAlgorithm");

//createBooking
const createBooking = async (req, res) => {
  try {
    const {
      pickupLocation,
      pickupCoordinates,
      dropoffLocation,
      dropoffCoordinates,
      vehicleType,
      scheduledAt,
    } = req.body;

    console.log(req.body);

    const distance = 5; 

    const currentBookings = await Booking.countDocuments({ status: "pending" });
    const price = 1000; 

    const status = scheduledAt ? "scheduled" : "pending";

    res.status(201).json({
      message: "Booking created successfully",
      // booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      message: "Error creating booking",
      error: error.message || error,
    });
  }
};
//controller for getUserBookings
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId })
      .populate("driver", "name email")
      .populate("vehicle", "license_plate model vehicleType")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "User bookings retrieved successfully",
      bookings,
    });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({
      message: "Error fetching user bookings",
      error: error.message || error,
    });
  }
};
const acceptBooking = async (req, res) => {
  try {
    const { bookingId, driverLat, driverLng } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, status: "pending" },
      { driver: req.user._id, status: "accepted" },
      { new: true }
    ).populate("vehicle");

    if (!booking) {
      return res
        .status(400)
        .json({ message: "Booking is no longer available" });
    }
    const driver = await User.findById(req.user._id).populate("vehicle");
    if (driver.vehicle) {
      booking.vehicle = driver.vehicle._id;
      await booking.save();
    } else {
      console.error("Driver has no vehicle assigned.");
      return res
        .status(400)
        .json({ message: "Driver has no vehicle assigned." });
    }

    await User.findByIdAndUpdate(req.user._id, { availability: false });

    // Calculate distance to pickup location
    const distanceToPickup = 5;
    
    const etaInMinutes = Math.round((distanceToPickup / 40) * 60);

    res.status(200).json({
      message: "Booking accepted successfully",
      booking,
      eta: etaInMinutes,
    });
  } catch (error) {
    console.error("Error accepting booking:", error);
    res.status(500).json({
      message: "Error accepting booking",
      error: error.message || error,
    });
  }
};


module.exports = {
  createBooking,
  acceptBooking,
};