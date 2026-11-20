import type { Activity } from "react-github-calendar";

/**
 * Server-side fetch of the contribution graph. Cached for six hours so the
 * homepage HTML already contains the calendar instead of waiting on a
 * client-side request. Returns undefined when the API is unreachable, which
 * lets the calendar component fall back to fetching in the browser.
 */
export async function getContributions(
  username: string
): Promise<Activity[] | undefined> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        next: { revalidate: 21_600 },
        signal: AbortSignal.timeout(5_000),
      }
    );

    if (!response.ok) return undefined;

    const data = (await response.json()) as {
      contributions?: Activity[];
    };

    return data.contributions?.length ? data.contributions : undefined;
  } catch {
    return undefined;
  }
}
