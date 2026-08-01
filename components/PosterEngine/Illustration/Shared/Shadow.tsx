interface ShadowProps {
  x: number;
  y: number;

  width: number;
  height: number;

  opacity?: number;
}

export function Shadow({
  x,
  y,
  width,
  height,

  opacity = 0.22,
}: ShadowProps) {

  return (
    <ellipse
      cx={x + width / 2}
      cy={y + height / 2}
      rx={width / 2}
      ry={height / 2}
      fill="#BDB5A7"
      opacity={opacity}
    />
  );
}