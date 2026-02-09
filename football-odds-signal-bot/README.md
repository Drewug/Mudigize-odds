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
