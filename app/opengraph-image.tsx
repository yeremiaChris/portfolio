import { ImageResponse } from "next/og";

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
        backgroundColor: "#10141a",
        color: "#dfe2eb",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#4edea3",
          fontFamily: "monospace",
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
        }}
      >
        Yeremia Chris Saragi
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#bbcabf",
          marginTop: 20,
        }}
      >
        Software Engineer · Frontend-Heavy
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 22,
          color: "#4cd7f6",
          marginTop: 36,
        }}
      >
        Health-tech · Logistics · React · Next.js · Vue
      </div>
    </div>,
    size,
  );
}
