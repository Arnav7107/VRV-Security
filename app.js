
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const connectDB = require("./config/db");

//connect to database
dotenv.config();
connectDB();

//create express app
const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

//routes
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const logoutRoute = require("./routes/logout"); 


app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", logoutRoute); 

app.get("/", (req, res) => {
  res.send("Logistics Platform API");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An error occurred!", error: err.message });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = { app };