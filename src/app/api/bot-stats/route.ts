import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/getDataFromToken";
import { getAttackStats, getRecentLogs, getFilteredLogs } from "@/lib/logger";

// Blocked IP ranges for reference
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

export async function GET(request: NextRequest) {
  try {
    // Only allow authenticated users to view bot stats (basic security)
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const stats = getAttackStats();
    const recentBlocked = getFilteredLogs({
      reason: ['gptbot-blocked', 'claudebot-blocked', 'suspicious-user-agent', 'rate-limit-exceeded']
    }).slice(-20); // Last 20 blocked requests

    const gptBotRequests = getFilteredLogs({ reason: 'gptbot-blocked' }).length;
    const ipRangeBlocks = getFilteredLogs({ reason: 'blocked-ip-range' }).length;
    const totalBlocked = recentBlocked.length;

    return NextResponse.json({
      stats,
      recentBlocked,
      blockedIPRanges: BLOCKED_IP_RANGES,
      botBreakdown: {
        gptBot: gptBotRequests,
        ipRangeBlocks: ipRangeBlocks,
        otherBots: totalBlocked - gptBotRequests - ipRangeBlocks,
        totalBlocked
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error("Bot stats API error:", error);
    return NextResponse.json(
      { message: "Failed to retrieve bot statistics" },
      { status: 500 }
    );
  }
}
