import { ImageResponse } from "next/og";

import {
  BACKGROUND,
  BRAND_ACCENT,
  FOREGROUND,
  MUTED_FOREGROUND,
} from "@/lib/colors";
import { ogImageFonts } from "@/lib/og/fonts";

export const alt = "Yeremia Chris Saragi — Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        backgroundColor: BACKGROUND,
        color: FOREGROUND,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -80,
          left: -40,
          width: 720,
          height: 520,
          background:
            "radial-gradient(closest-side, rgba(76, 215, 246, 0.12), transparent 70%)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: BRAND_ACCENT,
            fontFamily: "Geist Mono",
            letterSpacing: 1,
          }}
        >
          {"<YC />"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            marginTop: 28,
            lineHeight: 1.1,
            fontFamily: "Rethink Sans",
          }}
        >
          Yeremia Chris Saragi
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: MUTED_FOREGROUND,
            marginTop: 20,
            fontFamily: "Geist",
          }}
        >
          Software Engineer · Frontend-Heavy
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: BRAND_ACCENT,
            marginTop: 36,
            fontFamily: "Geist",
          }}
        >
          Health-tech · Logistics · React · Next.js · Vue
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: ogImageFonts,
    },
  );
}
