RuneScape Live Price Dashboard
A web application that displays live-updating RuneScape item prices in a modern, responsive dashboard.

Features
Fetches and stores data from RuneScape Wiki APIs.

Shows all RuneScape items with the latest prices, updating in real time via Socket.IO.

Modern, mobile-friendly React (Vite) frontend styled with Material UI (dark theme).

Data stored in PostgreSQL and managed by a Node.js/Express backend.

Easily deployed for free on Render.

Technologies
Frontend: React (Vite), Material UI, Socket.IO Client

Backend: Node.js (ES modules), Express, Socket.IO, PostgreSQL

Database: PostgreSQL

Deployment: Render

Project Structure

your-repo/
├── backend/
│   ├── index.js         # Express app entry point
│   ├── db.js            # PostgreSQL pool and table creation
│   ├── fetchApis.js     # RuneScape API sync logic
│   ├── routes.js        # Express routes
│   ├── socket.js        # Socket.IO setup
│   └── .env             # Backend environment variables
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # Main React component
│   │   ├── api.js       # API call logic
│   │   └── index.js     # React entrypoint
│   ├── .env             # Frontend environment variables
│   └── package.json
└── README.md


Local Setup
1. Clone the repo

git clone https://github.com/yourusername/your-repo.git
cd your-repo
2. Set up PostgreSQL
Ensure PostgreSQL is running.

Create a database (e.g. runescape).

Optionally, create a user and grant privileges.

3. Configure environment variables
backend/.env

PG_USER=your_pg_user
PG_PASSWORD=your_pg_password
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=runescape
PORT=8081
frontend/.env

VITE_API_URL=http://localhost:8081


4. Run the backend

cd backend
npm install
node index.js
Tables are auto-created on first run.

5. Run the frontend
cd ../frontend
npm install
npm run dev
Vite dev server runs at http://localhost:5173.

Deploying to Render
Push your code to GitHub.

Create a PostgreSQL instance on Render (Free plan).

Deploy the backend as a Web Service on Render:

Root Directory: backend

Build Command: npm install

Start Command: node index.js

Add environment variables (from your Render Postgres instance).

Deploy the frontend as a Web Service on Render:

Root Directory: frontend

Build Command: npm install && npm run build

Start Command: npx serve -s dist

Add environment variable:
VITE_API_URL=https://your-backend-service.onrender.com

In your backend code, make sure CORS allows your frontend Render URL and http://localhost:5173 for dev.

Assumptions & Limitations
Assumes RuneScape API and Render PostgreSQL free tier are available and not rate-limited.

No authentication: All users can see the data.

Not optimized for extremely large item counts (no pagination yet).

For hobby/demo use; production deployments may need scaling and security reviews.
