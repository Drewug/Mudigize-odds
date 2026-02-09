const telegram = require('./telegram');
const consoleNotify = require('./console');

module.exports = {
  notify: async (signal) => {
    consoleNotify.logSignal(signal);
    await telegram.sendSignal(signal);
  }
};
