class RateLimiter {
    constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) { // 15 minutes by default
        this.maxAttempts = maxAttempts;
        this.windowMs = windowMs;
        this.attempts = new Map();
    }

    isRateLimited(key) {
        const now = Date.now();
        const userAttempts = this.attempts.get(key) || [];

        // Remove expired attempts
        const validAttempts = userAttempts.filter(timestamp => now - timestamp < this.windowMs);

        // Update attempts
        this.attempts.set(key, validAttempts);

        // Check if rate limited
        if (validAttempts.length >= this.maxAttempts) {
            const oldestAttempt = validAttempts[0];
            const timeUntilReset = (oldestAttempt + this.windowMs) - now;
            return {
                limited: true,
                timeUntilReset: Math.ceil(timeUntilReset / 1000) // in seconds
            };
        }

        // Add new attempt
        validAttempts.push(now);
        this.attempts.set(key, validAttempts);

        return {
            limited: false,
            attemptsRemaining: this.maxAttempts - validAttempts.length
        };
    }

    reset(key) {
        this.attempts.delete(key);
    }
}

// Create instances for different rate limits
export const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes
export const otpRateLimiter = new RateLimiter(3, 5 * 60 * 1000);    // 3 attempts per 5 minutes
export const emailRateLimiter = new RateLimiter(3, 60 * 60 * 1000); // 3 attempts per hour 