import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

/*
 * Exact ratio from Header.tsx:
 *   circle: 29×29  |  gap: 12px  |  pill: 29×82  |  total height: 123
 *   Both elements same width. All corners fully rounded.
 *
 * Scaled to fit 180×180 with 10px padding:
 *   available height = 160,  scale = 160/123 = 1.3008
 *   circle_d = 37.7  |  gap = 15.6  |  pill_h = 106.7  |  width = 37.7
 */
export default function Icon() {
  const scale = 160 / 123;
  const w = Math.round(29 * scale);       // 38
  const circleH = Math.round(29 * scale); // 38
  const gap = Math.round(12 * scale);     // 16
  const pillH = Math.round(82 * scale);   // 107
  const pillR = w / 2;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: `${gap}px`,
          }}
        >
          <div
            style={{
              width: `${w}px`,
              height: `${circleH}px`,
              borderRadius: "50%",
              background: "white",
            }}
          />
          <div
            style={{
              width: `${w}px`,
              height: `${pillH}px`,
              borderRadius: `${pillR}px`,
              background: "white",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
