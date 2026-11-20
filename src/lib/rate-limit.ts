type Bucket = { count: number; resetTime: number };

const buckets = new Map<string, Bucket>();

/**
 * Small in-memory fixed-window limiter. Good enough for a personal site
 * running as a single instance; swap for Upstash if you scale out.
 */
export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
) {
  const now = Date.now();

  // Keep the map from growing forever.
  if (buckets.size > 5_000) {
    for (const [bucketKey, bucket] of buckets) {
      if (now > bucket.resetTime) buckets.delete(bucketKey);
    }
  }

  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetTime) {
    buckets.set(key, { count: 1, resetTime: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      retryAfter: Math.ceil((bucket.resetTime - now) / 1000),
    };
  }

  bucket.count += 1;
  return { ok: true, retryAfter: 0 };
}

export function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
