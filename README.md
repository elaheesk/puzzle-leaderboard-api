A simple backend-only RESTful API for a puzzle game leaderboard, built with Node.js, Express, and PostgreSQL.
Submitting player scores
Fetching top scores
Getting player rankings
Managing player data

Authentication is handled via a static API token (Bearer Token). 
 
Tech Stack:
Node.js + Express
PostgreSQL (with pg library)
dotenv for environment config
express-rate-limit to prevent abuse

Getting Started
1. clone the repo: https://github.com/elaheesk/puzzle-leaderboard-api.git
cd puzzle-leaderboard-api
2. Install dependencies: npm install
3. Set up .env by creating a.env file in the root directory:
PORT=3000
API_TOKEN=your_api_token_here
PG_USER=your_db_user
PG_HOST=localhost
PG_DATABASE=your_db_name
PG_PASSWORD=your_db_password
PG_PORT=5432
4. Start the server: node server.js
Server will start on http://localhost:3000

API Endpoints (Test endpoints in Postman)
In Authorization header add Bearer <API_TOKEN>
* POST /scores: Submit a player's score (adds to their total).
ex: {
  "name": "Alice",
  "score": 1500
}

*GET /leaderboard
Get the top 10 scores.
*GET /rank/:name
Get a specific player’s rank.
*POST /players
Create a new player manually.
*GET /players/:name
Get a player's info and rank.

Security & Rate Limiting
All routes except "/" are protected by a Bearer Token.
Rate limiting restricts requests per IP to prevent abuse (100 requests per minute).

IMprovments:
Add Redis cache to /leaderboard route to cache the results.
