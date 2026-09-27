export default function TickerStrip() {
  const items = [
    "Brand Identity","✦","Web Development","✦","UI/UX Design","✦",
    "Motion Graphics","✦","Graphic Design","✦","Video Editing","✦",
    "Animation","✦","Digital Products","✦","Creative Consulting","✦"
  ];

  const doubled = [...items, ...items];

  return (
    <div
      style={{
        background: 'var(--t-accent)',
        overflow: 'hidden',
        padding: '14px 0',
        borderTop: '1px solid var(--t-accent-h)',
        borderBottom: '1px solid var(--t-accent-h)',
      }}
    >
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              color: 'var(--t-on-accent)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: item === '✦' ? 400 : 700,
              fontSize: '13px',
              letterSpacing: item === '✦' ? '0' : '0.08em',
              textTransform: 'uppercase',
              marginRight: '28px',
              opacity: item === '✦' ? 0.5 : 1,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
