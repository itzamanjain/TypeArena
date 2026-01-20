import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/getDataFromToken";
import { getRecentLogs, getAttackStats, getFilteredLogs } from "@/lib/logger";

export async function GET(request: NextRequest) {
  try {
    // Only allow authenticated users to view logs (basic security)
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'recent';

    switch (action) {
      case 'stats':
        const stats = getAttackStats();
        return NextResponse.json({ stats }, { status: 200 });

      case 'filter':
        const filter: any = {};
        if (searchParams.get('ip')) filter.ip = searchParams.get('ip');
        if (searchParams.get('path')) filter.path = searchParams.get('path');
        if (searchParams.get('reason')) filter.reason = searchParams.get('reason');

        const filteredLogs = getFilteredLogs(filter);
        return NextResponse.json({ logs: filteredLogs }, { status: 200 });

      case 'recent':
      default:
        const limit = parseInt(searchParams.get('limit') || '50');
        const recentLogs = getRecentLogs(limit);
        return NextResponse.json({ logs: recentLogs }, { status: 200 });
    }

  } catch (error: any) {
    console.error("Logs API error:", error);
    return NextResponse.json(
      { message: "Failed to retrieve logs" },
      { status: 500 }
    );
  }
}

