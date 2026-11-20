import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = path.join(process.cwd(), "public", "fonts");

let boldFont: Buffer | null = null;
let monoFont: Buffer | null = null;

try {
  boldFont = fs.readFileSync(path.join(fontDir, "chubbo", "Chubbo-Bold.ttf"));
  monoFont = fs.readFileSync(
    path.join(fontDir, "n27", "n27-regular-webfont.ttf")
  );
} catch {
  // Fonts are optional — ImageResponse falls back to the system font.
}

export function renderOg({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  const fonts = [
    ...(boldFont
      ? [{ name: "Chubbo", data: boldFont, style: "normal" as const, weight: 700 as const }]
      : []),
    ...(monoFont
      ? [{ name: "N27", data: monoFont, style: "normal" as const, weight: 400 as const }]
      : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#171717",
          color: "#ececec",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 3,
              background: "#d4b25f",
              display: "flex",
            }}
          />
          <div
            style={{
              fontFamily: "N27",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#a3a3a3",
            }}
          >
            {kicker}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontFamily: "Chubbo",
              fontWeight: 700,
              fontSize: title.length > 42 ? 62 : 76,
              lineHeight: 1.04,
              letterSpacing: -1.5,
              maxWidth: 980,
              color: "#f5f5f5",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontFamily: "N27",
                fontSize: 24,
                lineHeight: 1.45,
                color: "#a3a3a3",
                maxWidth: 860,
                display: "flex",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 22,
            fontFamily: "N27",
            fontSize: 20,
            letterSpacing: 2,
            color: "#8a8a8a",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>{site.name}</div>
          <div style={{ display: "flex" }}>
            {site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: fonts.length ? fonts : undefined }
  );
}
