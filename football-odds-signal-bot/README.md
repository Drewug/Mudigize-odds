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
