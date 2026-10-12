import { ImageResponse } from "next/og";

export const alt = "Aditya Choubey - AI Automation & Software Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #07040f 0%, #1b1030 50%, #0b0712 100%)",
          color: "#f7f3ff",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "76px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "720px" }}>
          <div
            style={{
              border: "1px solid rgba(190, 160, 255, 0.45)",
              borderRadius: "999px",
              color: "#cbb8ff",
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 0,
              padding: "12px 20px",
              alignSelf: "flex-start",
            }}
          >
            ADITYA OS / PERSONAL PORTFOLIO
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h1 style={{ fontSize: 86, lineHeight: 0.95, margin: 0 }}>Aditya Choubey</h1>
            <p style={{ color: "#dcd2ff", fontSize: 36, fontWeight: 700, margin: 0 }}>
              AI Automation & Software Developer
            </p>
          </div>
          <p style={{ color: "#b8afc9", fontSize: 28, lineHeight: 1.35, margin: 0 }}>
            Software, workflow automation, analytics and industrial technology portfolio.
          </p>
        </div>
        <div
          style={{
            alignItems: "center",
            border: "1px solid rgba(190, 160, 255, 0.28)",
            borderRadius: "42px",
            display: "flex",
            height: 310,
            justifyContent: "center",
            width: 310,
          }}
        >
          <div
            style={{
              alignItems: "center",
              background: "#8b5cf6",
              borderRadius: "34px",
              boxShadow: "0 24px 80px rgba(139, 92, 246, 0.45)",
              display: "flex",
              fontSize: 80,
              fontWeight: 900,
              height: 150,
              justifyContent: "center",
              width: 150,
            }}
          >
            AC
          </div>
        </div>
      </div>
    ),
    size,
  );
}

