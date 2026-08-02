interface GridRendererProps {
  width: number;
  height: number;
  columns?: number;
  rows?: number;
}

export function GridRenderer({
  width,
  height,
  columns = 6,
  rows = 10,
}: GridRendererProps) {
  const columnWidth = width / columns;
  const rowHeight = height / rows;

  return (
    <g opacity={0.15}>
      {Array.from({ length: columns - 1 }).map((_, i) => (
        <line
          key={`col-${i}`}
          x1={(i + 1) * columnWidth}
          y1={0}
          x2={(i + 1) * columnWidth}
          y2={height}
          stroke="#4A90E2"
          strokeWidth={1}
        />
      ))}

      {Array.from({ length: rows - 1 }).map((_, i) => (
        <line
          key={`row-${i}`}
          x1={0}
          y1={(i + 1) * rowHeight}
          x2={width}
          y2={(i + 1) * rowHeight}
          stroke="#4A90E2"
          strokeWidth={1}
        />
      ))}
    </g>
  );
}