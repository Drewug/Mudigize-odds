const { LEAGUES, MARKETS } = require('../config');
const { oddsApi } = require('../apis');
const { valueBet, oddsDrop } = require('../signals');
const oddsRepository = require('../storage/oddsRepository');
const signalRepository = require('../storage/signalRepository');
const { notify } = require('../notifications');
const logger = require('../utils/logger');

const run = async () => {
  logger.info('Starting odds signal scan...');

  for (const league of LEAGUES) {
    logger.info(`Scanning league: ${league}`);
    const events = await oddsApi.fetchOdds(league);

    for (const event of events) {
      // 1. Detect Value Bets
      const valueSignals = valueBet.detectValue(event);
      for (const signal of valueSignals) {
        const recent = await signalRepository.getRecentSignals(signal.event_id, signal.type);
        if (recent.length === 0) {
          await signalRepository.saveSignal(signal);
          await notify(signal);
        }
      }

      // 2. Detect Odds Drops
      // We check for drops in major bookmakers
      const bookmakersTotrack = event.bookmakers.map(bm => bm.key);
      for (const bmKey of bookmakersTotrack) {
        const dropSignals = await oddsDrop.detectDrop(event, bmKey, 'h2h');
        for (const signal of dropSignals) {
          const recent = await signalRepository.getRecentSignals(signal.event_id, signal.type);
          if (recent.length === 0) {
            await signalRepository.saveSignal(signal);
            await notify(signal);
          }
        }
      }

      // 3. Save current odds for future drop detection
      for (const bm of event.bookmakers) {
        for (const market of bm.markets) {
           await oddsRepository.saveOdds({
             id: `${event.id}_${bm.key}_${market.key}`,
             event_id: event.id,
             sport_key: event.sport_key,
             commence_time: event.commence_time,
             home_team: event.home_team,
             away_team: event.away_team,
             bookmaker: bm.key,
             market: market.key,
             outcomes: market.outcomes
           });
        }
      }
    }
  }

  logger.info('Odds signal scan completed.');
};

module.exports = { run };
