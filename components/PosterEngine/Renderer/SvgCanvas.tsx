interface SvgCanvasProps {
  width: number;
  height: number;
  children: React.ReactNode;
}

export function SvgCanvas({
  width,
  height,
  children,
}: SvgCanvasProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}