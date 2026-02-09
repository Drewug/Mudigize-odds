module.exports = [
  {
    id: 'match_1',
    sport_key: 'soccer_epl',
    sport_title: 'Premier League',
    commence_time: '2026-02-15T15:00:00Z',
    home_team: 'Manchester City',
    away_team: 'Liverpool',
    bookmakers: [
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Manchester City', price: 1.85 },
              { name: 'Liverpool', price: 4.20 },
              { name: 'Draw', price: 3.80 }
            ]
          },
          {
            key: 'totals',
            outcomes: [
              { name: 'Over', price: 1.65, point: 2.5 },
              { name: 'Under', price: 2.30, point: 2.5 }
            ]
          },
          {
            key: 'btts',
            outcomes: [
              { name: 'Yes', price: 1.55 },
              { name: 'No', price: 2.40 }
            ]
          }
        ]
      },
      {
        key: 'bet365',
        title: 'Bet365',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Manchester City', price: 2.10 },
              { name: 'Liverpool', price: 4.80 },
              { name: 'Draw', price: 4.20 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'match_2',
    sport_key: 'soccer_germany_bundesliga',
    sport_title: 'Bundesliga',
    commence_time: '2026-02-15T17:30:00Z',
    home_team: 'Bayern Munich',
    away_team: 'Borussia Dortmund',
    bookmakers: [
      {
        key: 'pinnacle',
        title: 'Pinnacle',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Bayern Munich', price: 1.50 },
              { name: 'Borussia Dortmund', price: 6.00 },
              { name: 'Draw', price: 4.50 }
            ]
          },
          {
            key: 'totals',
            outcomes: [
              { name: 'Over', price: 1.40, point: 2.5 },
              { name: 'Under', price: 3.00, point: 2.5 }
            ]
          }
        ]
      }
    ]
  }
];
