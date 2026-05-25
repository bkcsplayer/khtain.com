import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'edge';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B0B10',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          fontFamily: 'serif',
        }}
      >
        {/* Ember accent bar */}
        <div
          style={{
            width: 80,
            height: 2,
            background: '#E8602F',
          }}
        />

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 160,
              fontStyle: 'italic',
              color: '#EFEAE0',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
            }}
          >
            K
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#6B6B78',
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            The Basis Under What Comes Next
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: '#6B6B78',
            fontSize: 18,
            fontFamily: 'monospace',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          <span>Khtain Block Technology Ltd.</span>
          <span>Calgary, Alberta</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
