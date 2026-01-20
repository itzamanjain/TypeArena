import { NextRequest } from "next/server";

// Rate limiting configuration for different endpoints
interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

const RATE_LIMIT_CONFIGS: Record<string, RateLimitConfig> = {
  // Authentication endpoints - very strict limits
  '/api/login': { windowMs: 15 * 60 * 1000, maxRequests: 3 }, // 3 per 15 minutes (reduced)
  '/api/signup': { windowMs: 60 * 60 * 1000, maxRequests: 2 }, // 2 per hour (reduced)
  '/api/logout': { windowMs: 5 * 60 * 1000, maxRequests: 5 }, // 5 per 5 minutes (reduced)

  // Profile and user data - strict limits
  '/api/profile': { windowMs: 15 * 60 * 1000, maxRequests: 10 }, // 10 per 15 minutes (reduced)
  '/api/player-profile': { windowMs: 15 * 60 * 1000, maxRequests: 15 }, // 15 per 15 minutes (reduced)

  // Leaderboard and public data - moderate limits but reduced
  '/api/leaderboard': { windowMs: 5 * 60 * 1000, maxRequests: 20 }, // 20 per 5 minutes (reduced)

  // Game/store results - strict limits
  '/api/store-result': { windowMs: 10 * 60 * 1000, maxRequests: 15 }, // 15 per 10 minutes (reduced)

  // Payment related - very strict limits
  '/api/orders': { windowMs: 30 * 60 * 1000, maxRequests: 5 }, // 5 per 30 minutes (reduced)
  '/api/orders/user': { windowMs: 15 * 60 * 1000, maxRequests: 10 }, // 10 per 15 minutes (reduced)
  '/api/verify-payment': { windowMs: 30 * 60 * 1000, maxRequests: 8 }, // 8 per 30 minutes (reduced)

  // Webhooks - very permissive (should be handled by middleware)
  '/api/webhooks': { windowMs: 60 * 1000, maxRequests: 500 }, // High limit but reduced for webhooks

  // Default for any other API endpoints - strict
  default: { windowMs: 15 * 60 * 1000, maxRequests: 15 }, // 15 per 15 minutes (reduced)
};

// In-memory store for rate limiting (consider Redis for production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Enhanced rate limiting function with configurable limits per endpoint
 */
export function rateLimit(request: NextRequest, customConfig?: RateLimitConfig): boolean {
  const ip = getClientIP(request);
  const path = request.nextUrl.pathname;

  // Get rate limit config for this endpoint
  const config = customConfig || getRateLimitConfig(path);

  const now = Date.now();
  const key = `${ip}:${path}`; // Include path in key for per-endpoint limiting
  const rateLimitData = rateLimitStore.get(key);

  if (!rateLimitData || now > rateLimitData.resetTime) {
    // First request or window expired
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs
    });
    return true;
  }

  if (rateLimitData.count >= config.maxRequests) {
    // Clean up old entries periodically
    if (rateLimitStore.size > 10000) {
      cleanupOldEntries();
    }
    return false; // Rate limit exceeded
  }

  rateLimitData.count++;
  return true;
}

/**
 * Get rate limit configuration for a specific path
 */
function getRateLimitConfig(path: string): RateLimitConfig {
  // Check for exact matches first
  if (RATE_LIMIT_CONFIGS[path]) {
    return RATE_LIMIT_CONFIGS[path];
  }

  // Check for prefix matches (e.g., /api/webhooks/razorpay should match /api/webhooks)
  for (const [route, config] of Object.entries(RATE_LIMIT_CONFIGS)) {
    if (route !== 'default' && path.startsWith(route)) {
      return config;
    }
  }

  return RATE_LIMIT_CONFIGS.default;
}

/**
 * Get client IP address from various headers
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');

  const ip = forwarded?.split(',')[0]?.trim() ||
             realIP ||
             cfConnectingIP ||
             'unknown';

  return ip;
}

/**
 * Clean up old rate limit entries to prevent memory leaks
 */
function cleanupOldEntries(): void {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Get current rate limit status for debugging
 */
export function getRateLimitStatus(request: NextRequest): {
  ip: string;
  path: string;
  config: RateLimitConfig;
  currentCount: number;
  resetTime: Date;
} {
  const ip = getClientIP(request);
  const path = request.nextUrl.pathname;
  const config = getRateLimitConfig(path);
  const key = `${ip}:${path}`;
  const data = rateLimitStore.get(key);

  return {
    ip,
    path,
    config,
    currentCount: data?.count || 0,
    resetTime: data ? new Date(data.resetTime) : new Date()
  };
}