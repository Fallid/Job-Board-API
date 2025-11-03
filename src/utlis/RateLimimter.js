const { RateLimiterMemory } = require('rate-limiter-flexible');
const Boom = require('@hapi/boom');

// Rate limiter configuration: 10 requests per second
const rateLimiter = new RateLimiterMemory({
  points: 10, // Number of requests
  duration: 1, // Per 1 second
});

const rateLimiterMiddleware = async (request, h) => {
  const ip = request.info.remoteAddress;

  try {
    await rateLimiter.consume(ip);
    return h.continue;
  }
  catch (rejRes) {
    const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
    throw Boom.tooManyRequests(`Rate limit exceeded. Retry after ${secs} seconds`);
  }
};

module.exports = rateLimiterMiddleware;
