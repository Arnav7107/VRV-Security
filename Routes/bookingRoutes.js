const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../Middleware/AuthMiddleware");
const {
  createBooking,
  acceptBooking,
  getPriceEstimate,
  updateJobStatus,
  rateDriver,
  getUserBookings,
  getPendingBookings,
  updateDriverLocation,
} = require("../Controllers/bookingController");


//all the routes for booking
router.post("/create", protect, authorizeRoles("user"), createBooking);
router.post("/accept", protect, authorizeRoles("driver"), acceptBooking);





module.exports = router;