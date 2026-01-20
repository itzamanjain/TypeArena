import { NextRequest } from "next/server";

interface LogEntry {
  timestamp: string;
  ip: string;
  userAgent: string;
  path: string;
  method: string;
  statusCode?: number;
  reason?: string;
  country?: string;
  userId?: string;
}

// In-memory log storage (consider external logging service for production)
const logs: LogEntry[] = [];
const MAX_LOGS = 10000; // Keep last 10k entries

/**
 * Log suspicious or notable activity
 */
export function logActivity(
  request: NextRequest,
  reason: string,
  statusCode?: number,
  userId?: string
): void {
  const ip = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const path = request.nextUrl.pathname;
  const method = request.method;
  const country = request.headers.get('x-vercel-ip-country') ||
                  request.headers.get('cf-ipcountry') ||
                  'unknown';

  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    ip,
    userAgent,
    path,
    method,
    statusCode,
    reason,
    country,
    userId
  };

  logs.push(logEntry);

  // Keep logs within limit
  if (logs.length > MAX_LOGS) {
    logs.shift();
  }

  // Console log for immediate visibility
  console.log(`[${reason.toUpperCase()}] ${method} ${path} - IP: ${ip} - UA: ${userAgent.substring(0, 50)}${userAgent.length > 50 ? '...' : ''}`);
}

/**
 * Get recent logs for analysis
 */
export function getRecentLogs(limit = 100): LogEntry[] {
  return logs.slice(-limit);
}

/**
 * Get logs filtered by criteria
 */
export function getFilteredLogs(filter: Partial<LogEntry>): LogEntry[] {
  return logs.filter(log => {
    return Object.entries(filter).every(([key, value]) => {
      return log[key as keyof LogEntry] === value;
    });
  });
}

/**
 * Get attack statistics
 */
export function getAttackStats(): {
  totalRequests: number;
  blockedRequests: number;
  suspiciousIPs: string[];
  topPaths: Record<string, number>;
  recentBlocks: number;
} {
  const now = Date.now();
  const lastHour = now - (60 * 60 * 1000);

  const recentLogs = logs.filter(log =>
    new Date(log.timestamp).getTime() > lastHour
  );

  const blockedRequests = recentLogs.filter(log =>
    log.statusCode === 403 || log.statusCode === 429
  ).length;

  const suspiciousIPs = [...new Set(
    recentLogs
      .filter(log => log.reason !== 'normal')
      .map(log => log.ip)
  )];

  const topPaths: Record<string, number> = {};
  recentLogs.forEach(log => {
    topPaths[log.path] = (topPaths[log.path] || 0) + 1;
  });

  return {
    totalRequests: logs.length,
    blockedRequests,
    suspiciousIPs,
    topPaths,
    recentBlocks: blockedRequests
  };
}

/**
 * Get client IP from various headers
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
 * Export logs for external analysis
 */
export function exportLogs(): LogEntry[] {
  return [...logs];
}

/**
 * Clear logs (admin function)
 */
export function clearLogs(): void {
  logs.length = 0;
}

