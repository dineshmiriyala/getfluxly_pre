import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GetFluxly";
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
          width: "100%",
          height: "100%",
          backgroundColor: "#05070f",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(252,163,17,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,190,69,0.16), transparent 38%), radial-gradient(circle at 50% 90%, rgba(20,33,61,0.4), transparent 55%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontFamily:
              "SFMono-Regular, SF Mono, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "#e8ecf2",
          }}
        >
          GetFluxly
        </div>
      </div>
    ),
    size
  );
}
