import { renderOg } from "@/lib/og";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Logs";
  const summary = searchParams.get("summary") ?? "";

  return renderOg({
    kicker: "Logs",
    title,
    subtitle: summary,
  });
}
