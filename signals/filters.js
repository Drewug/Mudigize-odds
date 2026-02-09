module.exports = {
  applyGlobalFilters: (signals) => {
    // Example: Only signals with value > 10% if we want to be very strict
    // Or filter out certain leagues if they are currently too volatile
    return signals.filter(s => {
      // Add custom logic here
      return true;
    });
  }
};
