exports.PORT = process.env.PORT || 3000;
exports.DATABASE_URL =
  process.env.DATABSE_URL ||
  "mongodb://velafarq:Tafthenry22@ds129762.mlab.com:29762/practica-db";
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  "mongodb://velafarq:Tafthenry22@ds229732.mlab.com:29732/practica-test-db";

// exports.JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";
