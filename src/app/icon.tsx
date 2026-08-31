import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
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
          fontSize: 26,
          fontWeight: 900,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '-1px',
        }}
      >
        <span style={{ color: '#FFFFFF', fontWeight: 900 }}>S</span>
        <span
          style={{
            color: '#2DD4BF',
            fontWeight: 900,
            fontSize: 28,
            marginLeft: '1px',
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
