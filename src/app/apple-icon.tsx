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
          background: '#090A0C',
          borderRadius: '38px',
          border: '4px solid rgba(255, 255, 255, 0.1)',
          fontSize: 110,
          fontWeight: 800,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '-2px',
          paddingBottom: '4px',
        }}
      >
        <span style={{ color: '#FFFFFF', fontWeight: 900 }}>S</span>
        <span
          style={{
            color: '#2DD4BF',
            fontWeight: 900,
            fontSize: 120,
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
