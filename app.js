
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
const userRoutes = require("./Routes/UserRoutes");
const bookingRoutes = require("./Routes/bookingRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const logoutRoute = require("./Routes/logout"); 


app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", logoutRoute); 

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Logistics Platform API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        header {
          background-color: #333;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .container {
          margin: 20px;
        }
        a {
          text-decoration: none;
          color: #333;
          font-size: 18px;
          font-weight: bold;
        }
        a:hover {
          color: #007BFF;
        }
        footer {
          background-color: #333;
          color: white;
          text-align: center;
          padding: 10px;
          position: absolute;
          bottom: 0;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>Welcome to the Logistics Platform API</h1>
      </header>
      <div class="container">
        <p>Welcome to the Logistics Platform API. Click below to access the API documentation:</p>
        <a href="https://documenter.getpostman.com/view/25963454/2sAYBVjCSk">API Documentation</a>
      </div>
      <footer>
        <p>&copy; 2024 Logistics Platform</p>
      </footer>
    </body>
    </html>
  `);
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