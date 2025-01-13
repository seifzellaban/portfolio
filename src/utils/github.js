export async function fetchGithubCommits(username) {
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const CACHE_KEY = `github-commits-${username}`;
  const CACHE_TTL = 3600; // 1 hour in seconds

  if (!GITHUB_TOKEN) {
    console.error("No GitHub token found!");
    throw new Error("GitHub token is required");
  }

  const cachedData = getCachedData(CACHE_KEY);
  if (cachedData) {
    return cachedData.value;
  }

  try {
    const currentYear = new Date().getFullYear();
    const startYear = 2020;
    let totalCommits = 0;

    for (let year = startYear; year <= currentYear; year++) {
      console.log(`Fetching commits for year ${year}...`);

      const query = `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
              totalCommitContributions
              restrictedContributionsCount
            }
          }
        }
      `;

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: {
            username,
            from: `${year}-01-01T00:00:00Z`,
            to: `${year}-12-31T23:59:59Z`,
          },
        }),
      });

      const data = await response.json();

      if (data.errors) {
        console.error("GraphQL Errors:", data.errors);
        throw new Error(data.errors[0].message);
      }

      const yearCommits =
        (data.data?.user?.contributionsCollection?.totalCommitContributions ||
          0) +
        (data.data?.user?.contributionsCollection
          ?.restrictedContributionsCount || 0);

      console.log(`Year ${year} commits:`, yearCommits);
      totalCommits += yearCommits;
    }

    console.log("Total commits:", totalCommits);

    // Store in browser cache
    setCachedData(CACHE_KEY, totalCommits, CACHE_TTL);

    return totalCommits;
  } catch (error) {
    console.error("Error fetching GitHub commits:", error);
    throw error;
  }
}

function setCachedData(key, value, ttl) {
  const item = {
    value,
    timestamp: Date.now(),
    ttl: ttl * 1000, // Convert to milliseconds
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getCachedData(key) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsedItem = JSON.parse(item);
    const now = Date.now();

    if (now - parsedItem.timestamp > parsedItem.ttl) {
      localStorage.removeItem(key);
      return null;
    }

    return parsedItem;
  } catch {
    return null;
  }
}

export function invalidateCommitsCache(username) {
  localStorage.removeItem(`github-commits-${username}`);
}
