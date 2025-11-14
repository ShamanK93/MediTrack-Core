const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: {
    status: "error",
    message: "Trop de tentatives de connexion. Réessayez plus tard."
  },
});

module.exports = loginLimiter;
