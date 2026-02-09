const cronApi = require('../api/cron');

const mockReq = {
  headers: {}
};

const mockRes = {
  status: function(code) {
    this.code = code;
    return this;
  },
  json: function(data) {
    this.data = data;
    console.log(`Response [${this.code}]:`, JSON.stringify(this.data, null, 2));
  }
};

console.log("Testing Vercel API /api/cron...");
cronApi(mockReq, mockRes);
