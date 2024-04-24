// jwt.config.js

module.exports = {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d', // Set expiration time for JWT tokens (e.g., '1h' for 1 hour)
    algorithm: 'HS256', // Algorithm used for signing/verifying tokens
 };
  