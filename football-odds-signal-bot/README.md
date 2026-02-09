# Mudigize OddsSignal Bot

A Node.js football sports bet odd signal bot that detects value bets and odds drops using free APIs.

## Features
- **Value Bet Detection**: Uses Pinnacle as a "sharp" benchmark to find value in other bookmakers.
- **Odds Drop Detection**: Tracks odds history in a local SQLite database and alerts when odds drop significantly.
- **Top Leagues Support**: Tracks Bundesliga, Eredivisie, Primeira Liga, La Liga, J1 League, Allsvenskan, Chinese Super League, and Premier League.
- **Telegram Notifications**: Sends real-time alerts to a Telegram chat.
- **Automated Scheduling**: Runs periodically using node-cron.

## Prerequisites
- Node.js installed.
- API Key from The Odds API (Free tier available).
- Telegram Bot Token and Chat ID.

## Setup
1. Clone the repository.
2. Install dependencies:
   npm install
3. Create a .env file in the root directory:
   ODDS_API_KEY=your_odds_api_key
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   TELEGRAM_CHAT_ID=your_telegram_chat_id
   LOG_LEVEL=info
4. Run the bot:
   node main.js

## Project Structure
- apis/: API client for The Odds API.
- config/: Configuration and constants.
- models/: Logic for implied probability and value calculation.
- signals/: Signal detection rules (Value Bet, Odds Drop).
- storage/: SQLite database setup and repositories.
- notifications/: Telegram and console notification services.
- scheduler/: Cron job and main execution flow.

## License
MIT

## Sample Telegram Notifications

### 1. Match Prediction
🚨 **MATCH PREDICTION** 🚨

⚽ Bayern Munich vs Borussia Dortmund
🏆 German Bundesliga
⏰ Kickoff: 2/9/2026, 8:54:54 PM

🔍 **Predicted Outcomes:**
• Bayern Munich (65% confidence)
• Over 2.5 Goals (72% confidence)
• BTTS - Yes (68% confidence)

---

### 2. Value Bet
🚨 **VALUE BET** 🚨

⚽ Real Madrid vs Barcelona
🏆 Spain La Liga
🎯 Pick: **Real Madrid**
📈 Odds: **2.10** (Fair: 1.95)
💰 Value: **7.69%**
🏦 Bookmaker: Bet365

---

### 3. Odds Drop
🚨 **ODDS DROP** 🚨

⚽ Manchester City vs Liverpool
🏆 Premier League
🎯 Pick: **Manchester City**
📉 Drop: **13.16%** (1.90 ➡️ 1.65)
🏦 Bookmaker: Pinnacle

## Deployment

### Vercel (Serverless)
1. Push this code to a GitHub repository.
2. Connect the repository to Vercel.
3. Add Environment Variables: `ODDS_API_KEY`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
4. The cron job is configured in `vercel.json` to run every 4 hours.
5. **Note:** Vercel is stateless. The SQLite database will reset on every deployment or function spin-up. For persistence, consider using [Neon Postgres](https://neon.tech/) (free tier).

### Render (Background Worker - Recommended)
1. Push this code to a GitHub repository.
2. Create a new **Web Service** or **Background Worker** on Render.
3. Use `npm start` as the start command.
4. Add Environment Variables.
5. Render supports persistent disks if you use a Web Service with a disk, allowing the SQLite database to survive restarts.
