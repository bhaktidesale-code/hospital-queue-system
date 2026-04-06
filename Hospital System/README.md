# Smart Hospital Patient Queue Management System

This is a full-stack mini project designed for a college DBMS subject. It manages hospital patient queues efficiently using a relational database.

## Features
- **Patient Registration:** Register patients and automatically assign them to a queue.
- **Queue Management:** Prioritizes patients based on severity (1-5) and arrival time.
- **Department-wise Handling:** Filter queues and serve patients by their assigned department.
- **Serve Patient:** Fetches the highest priority patient and updates their status.
- **Patient History:** Keeps a record of all served patients.
- **Dashboard:** Live statistics of total, waiting, and served patients.

## Tech Stack
- **Frontend:** React.js, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MySQL

## Database Normalization
The database is structured to meet 3NF requirements with the following tables:
- `Departments`
- `Patients`
- `Queue`
- `History`

## Setup Instructions

### 1. Database Setup
1. Make sure you have MySQL Server installed and running (e.g., via XAMPP, WAMP, or standalone).
2. Open your preferred MySQL client (like phpMyAdmin or MySQL Workbench).
3. Import the `database/schema.sql` file or run its contents to create the `hospital_queue` database and required tables.

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the `.env` file with your MySQL credentials. (Default uses `root` with no password).
4. Start the Express server:
   ```bash
   node server.js
   ```
   *The server runs on http://localhost:5000*

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
   *The app will be accessible at http://localhost:5173*

## Usage
- Start by viewing the Dashboard.
- Register a few patients with different severities and departments.
- Go to "View Queue" to see how they are ordered (Severity DESC, Arrival ASC).
- Go to "Serve Patient" and click "Mark as Served" to process the top priority patient.
- Check "Patient History" to see the logs.