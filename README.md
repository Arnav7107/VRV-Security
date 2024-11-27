# Taxi Booking Backend System 🚖

This is a **Taxi Booking Backend System** inspired by platforms like Uber, featuring **Role-Based Access Control (RBAC)** with three distinct roles: **Admin**, **Passengers (Users)**, and **Drivers**. The system ensures secure and role-specific functionality, enabling smooth management of taxi bookings.

## Features
- **User Authentication**: All roles must register and log in to access the system.
- **Role-Specific Access**:
  - **Passengers** can create new ride bookings.
  - **Drivers** can view and accept assigned rides but cannot create bookings.
  - **Admins** have exclusive access to view and manage driver information.
- **Security & Privacy**: Strict role-based access ensures data privacy and controlled access.

## Tech Stack
- **Backend**: Node.js, Express
- **Database**: MongoDB 
- **Authentication**: JWT

## API Documentation 📄
For detailed information on available endpoints and how to use them, refer to the [API Documentation](https://documenter.getpostman.com/view/25963454/2sAYBVjCSk).

## Setup Instructions
1. Clone the repository:
    ```bash
    git clone https://github.com/Arnav7107/VRV-Security.git
    ```
2. Navigate to the project directory:
    ```bash
    cd VRV-Security
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file and add necessary environment variables:
    ```plaintext
    PORT=5000
    DATABASE_URL=your_database_url
    JWT_SECRET=your_secret_key
    ```

5. Start the server:
    ```bash
    npm start
    ```

