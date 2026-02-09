module.exports = (req, res) => {
  res.status(200).send(`
    <h1>Mudigize OddsSignal Bot</h1>
    <p>The bot is active and monitoring football leagues.</p>
    <ul>
      <li><strong>Status:</strong> Running</li>
      <li><strong>Leagues:</strong> EPL, Bundesliga, La Liga, etc.</li>
      <li><strong>Cron:</strong> Every 4 hours</li>
    </ul>
    <p>To manually trigger a scan, visit <a href="/api/cron">/api/cron</a>.</p>
  `);
};
