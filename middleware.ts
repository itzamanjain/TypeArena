import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logActivity } from "@/lib/logger";

// Rate limiting store - in production, use Redis or similar
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30; // 30 requests per minute per IP

// Blocked IP ranges (CIDR notation) - Azure/Microsoft ranges causing bot attacks
const BLOCKED_IP_RANGES = [
  '132.196.86.0/24',
  '172.182.202.0/25',
  '172.182.204.0/24',
  '172.182.207.0/25',
  '172.182.214.0/24',
  '172.182.215.0/24',
  '20.125.66.80/28',
  '20.171.206.0/24',
  '20.171.207.0/24',
  '4.227.36.0/25',
  '52.230.152.0/24',
  '74.7.175.128/25',
  '74.7.227.0/25',
  '74.7.227.128/25',
  '74.7.228.0/25',
  '74.7.230.0/25',
  '74.7.241.0/25',
  '74.7.241.128/25',
  '74.7.242.0/25',
  '74.7.243.128/25',
  '74.7.244.0/25',
];

// Blocked user agents (common bot signatures)
const BLOCKED_USER_AGENTS = [
  'python-requests',
  'python',
  'curl',
  'wget',
  'go-http-client',
  'java/',
  'node-fetch',
  'axios',
  'httpclient',
  'scrapy',
  'selenium',
  'phantomjs',
  'headless',
  'bot',
  'crawl',
  'spider',
  'scraper',
  'archive',
  'wget',
  'winhttp',
  'httrack',
  'clshttp',
  'archiver',
  'loader',
  'email',
  'harvest',
  'extract',
  'grab',
  'miner',
  'python-urllib',
  'gptbot', // OpenAI's GPTBot - blocking due to excessive requests
  'chatgpt-user', // ChatGPT related bots
  'claudebot', // Anthropic's Claude bot
];

// Suspicious patterns in user agent
const SUSPICIOUS_PATTERNS = [
  /^\s*$/, // Empty or whitespace only
  /^[^a-zA-Z]*$/, // No letters at all
  /.{200,}/, // Extremely long user agent
];

// Function to check if user agent is suspicious
function isSuspiciousUserAgent(userAgent: string): boolean {
  if (!userAgent) return true;

  const ua = userAgent.toLowerCase();

  // Check blocked user agents
  if (BLOCKED_USER_AGENTS.some(blocked => ua.includes(blocked))) {
    return true;
  }

  // Check suspicious patterns
  if (SUSPICIOUS_PATTERNS.some(pattern => pattern.test(userAgent))) {
    return true;
  }

  // Additional checks for AI/ML bots that might be problematic
  const aiBots = ['gptbot', 'claudebot', 'bardbot', 'bingbot', 'anthropic'];
  if (aiBots.some(bot => ua.includes(bot))) {
    // Log AI bot activity but allow some (like legitimate search bots)
    // For now, block most AI bots due to excessive crawling
    if (ua.includes('gptbot') || ua.includes('claudebot')) {
      return true;
    }
  }

  return false;
}

// Function to check rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const rateLimitData = rateLimitStore.get(ip);

  if (!rateLimitData || now > rateLimitData.resetTime) {
    // First request or window expired
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return true;
  }

  if (rateLimitData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }

  rateLimitData.count++;
  return true;
}

// Function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');

  // Try different headers in order of preference
  const ip = forwarded?.split(',')[0]?.trim() ||
             realIP ||
             cfConnectingIP ||
             'unknown';

  return ip;
}

// Function to convert IP address to number
function ipToNumber(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

// Function to check if IP is in blocked range
function isBlockedIPRange(ip: string): boolean {
  if (ip === 'unknown') return false;

  try {
    const ipNum = ipToNumber(ip);

    for (const cidr of BLOCKED_IP_RANGES) {
      const [network, prefixLength] = cidr.split('/');
      const networkNum = ipToNumber(network);
      const mask = (0xffffffff << (32 - parseInt(prefixLength))) >>> 0;

      if ((ipNum & mask) === (networkNum & mask)) {
        return true;
      }
    }
  } catch (error) {
    // If IP parsing fails, allow the request (fail-safe)
    console.error('IP parsing error:', error);
  }

  return false;
}

// Removed logSuspiciousActivity function - now using centralized logger

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const ip = getClientIP(request);
  const path = request.nextUrl.pathname;

  // 0. Check blocked IP ranges (first line of defense)
  if (isBlockedIPRange(ip)) {
    logActivity(request, 'blocked-ip-range', 403);
    return new Response('Access Denied - IP Range Blocked', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      }
    });
  }

  // 1. Check for suspicious user agents
  if (isSuspiciousUserAgent(userAgent)) {
    const blockReason = userAgent.toLowerCase().includes('gptbot') ? 'gptbot-blocked' :
                       userAgent.toLowerCase().includes('claudebot') ? 'claudebot-blocked' :
                       'suspicious-user-agent';
    logActivity(request, blockReason, 403);
    return new Response('Access Denied', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      }
    });
  }

  // 2. Apply rate limiting
  if (!checkRateLimit(ip)) {
    logActivity(request, 'rate-limit-exceeded', 429);
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'Content-Type': 'text/plain',
        'Retry-After': '60',
      }
    });
  }

  // 3. Additional checks for API routes
  if (path.startsWith('/api/')) {
    // Block requests without proper headers for API routes
    const accept = request.headers.get('accept') || '';
    const contentType = request.headers.get('content-type') || '';

    // API requests should typically have proper accept headers
    if (path !== '/api/webhooks/razorpay' && // Allow webhook without restrictions
        !accept.includes('application/json') &&
        !accept.includes('*/*') &&
        request.method !== 'GET') {
      logActivity(request, 'suspicious-api-headers', 400);
      return new Response('Bad Request', { status: 400 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
