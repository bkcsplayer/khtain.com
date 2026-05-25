// app/icon.tsx — favicon, generated dynamically
import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B0B10',
          color: '#EFEAE0',
          fontSize: 26,
          fontStyle: 'italic',
          fontFamily: 'serif',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: '-0.04em',
        }}
      >
        K
      </div>
    ),
    { ...size },
  );
}
