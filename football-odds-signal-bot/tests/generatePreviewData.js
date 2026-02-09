const runTest = require('./runTest');
const fs = require('fs');
const path = require('path');

const signals = runTest();

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #e6ebee; padding: 20px; }
        .chat-container { max-width: 400px; margin: auto; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: #0088cc; color: white; padding: 10px 15px; font-weight: bold; }
        .message { margin: 10px; padding: 10px; border-radius: 10px; background: #effdde; position: relative; font-size: 14px; line-height: 1.4; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .message::after { content: ''; position: absolute; left: -8px; top: 10px; border: 8px solid transparent; border-right-color: #effdde; }
        .type { color: #d32f2f; font-weight: bold; margin-bottom: 5px; display: block; }
        .match { font-weight: bold; }
        .detail { display: block; margin-top: 3px; }
        .confidence { color: #2e7d32; font-weight: bold; }
        .footer { font-size: 10px; color: #888; text-align: right; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="chat-container">
        <div class="header">Mudigize OddsSignal Bot</div>
        ${signals.map(s => {
            let detailsHtml = '';
            if (s.type === 'MATCH_PREDICTION') {
                detailsHtml = `
                    <span class="match">⚽ ${s.details.match}</span><br>
                    <span class="detail">🏆 ${s.details.league}</span><br>
                    <span class="detail">⏰ Kickoff: ${new Date(s.details.kickoff).toLocaleString()}</span><br><br>
                    <strong>🔍 Predicted Outcomes:</strong><br>
                    ${s.details.predictions.map(p => `• ${p.pick} (<span class="confidence">${p.confidence}</span> confidence)`).join('<br>')}
                `;
            } else if (s.type === 'VALUE_BET') {
                detailsHtml = `
                    <span class="match">⚽ ${s.details.match}</span><br>
                    <span class="detail">🏆 ${s.details.league}</span><br>
                    <span class="detail">🎯 Pick: <strong>${s.details.outcome}</strong></span><br>
                    <span class="detail">📈 Odds: <strong>${s.details.price}</strong> (Fair: ${s.details.fair_price})</span><br>
                    <span class="detail">💰 Value: <span class="confidence">${s.details.value}</span></span><br>
                    <span class="detail">🏦 Bookmaker: ${s.details.bookmaker}</span>
                `;
            }
            return `
                <div class="message">
                    <span class="type">🚨 ${s.type.replace(/_/g, ' ')} 🚨</span>
                    ${detailsHtml}
                    <div class="footer">12:34 PM</div>
                </div>
            `;
        }).join('')}
    </div>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'visualPreview.html'), htmlContent);
console.log('Visual preview generated: football-odds-signal-bot/tests/visualPreview.html');
