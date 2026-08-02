interface IllustrationRendererProps {
  venue: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function IllustrationRenderer({
  venue,
  x,
  y,
  width,
  height,
}: IllustrationRendererProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={10}
        fill="#EFEADE"
      />

      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Georgia"
        fontSize="24"
        fill="#8C8578"
      >
        <rect
    x={x + 30}
    y={y + 30}
    width={width - 60}
    height={height - 120}
    fill="#F8F5EF"
    stroke="#D7D0C3"
    strokeWidth={1}
/>
<ellipse
    cx={x + width/2}
    cy={y + (height-120)/2 + 30}
    rx={width*0.22}
    ry={height*0.15}
    fill="none"
    stroke="#6F695E"
    strokeWidth={2}
/>

<ellipse
    cx={x + width/2}
    cy={y + (height-120)/2 + 30}
    rx={width*0.16}
    ry={height*0.10}
    fill="none"
    stroke="#8C867B"
    strokeWidth={1.2}
/>
<line
    x1={x+60}
    y1={y+height-72}
    x2={x+width-60}
    y2={y+height-72}
    stroke="#D0CABF"
/>
        {venue.toUpperCase()}
      </text>

      <text
        x={x + width / 2}
        y={y + height / 2 + 36}
        textAnchor="middle"
        fontFamily="Arial"
        fontSize="14"
        fill="#9E988C"
        letterSpacing="3"
      >
        VECTOR ILLUSTRATION
      </text>
    </g>
  );
}