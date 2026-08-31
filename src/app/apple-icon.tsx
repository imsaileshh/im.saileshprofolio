import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          fontSize: 140,
          fontWeight: 900,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '-4px',
        }}
      >
        <span style={{ color: '#FFFFFF', fontWeight: 900 }}>S</span>
        <span
          style={{
            color: '#2DD4BF',
            fontWeight: 900,
            fontSize: 150,
            marginLeft: '4px',
          }}
        >
          .
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
