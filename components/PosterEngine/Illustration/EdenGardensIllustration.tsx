import type { IllustrationProps } from "./IllustrationTypes";

import { SeatingBowl } from "./Shared/SeatingBowl";
import { PlayingField } from "./Shared/PlayingField";
import { FloodlightTower } from "./Shared/FloodlightTower";
import { Pavilion } from "./Shared/Pavilion";
import { Trees } from "./Shared/Trees";
import { Shadow } from "./Shared/Shadow";

export function EdenGardensIllustration({
  venue,
  x,
  y,
  width,
  height,
}: IllustrationProps) {
  const centreX = x + width / 2;

  const bowlX = x + width * 0.08;
  const bowlY = y + height * 0.18;
  const bowlWidth = width * 0.84;
  const bowlHeight = height * 0.55;

  const fieldWidth = bowlWidth * 0.50;
  const fieldHeight = bowlHeight * 0.42;

  const fieldX = centreX - fieldWidth / 2;
  const fieldY =
    bowlY +
    bowlHeight / 2 -
    fieldHeight / 2;

  const pavilionWidth = width * 0.22;
  const pavilionHeight = height * 0.18;

  const pavilionX =
    centreX - pavilionWidth / 2;

  const pavilionY =
    bowlY + bowlHeight * 0.15;

  const towerHeight = height * 0.30;
  const towerBaseY =
    bowlY + bowlHeight * 0.54;

  return (
    <g>
      {/* Overall ground shadow */}

      <Shadow
        x={x + width * 0.12}
        y={y + height * 0.64}
        width={width * 0.76}
        height={height * 0.12}
        opacity={0.2}
      />

      {/* Trees behind the stadium */}

      <Trees
        x={x + width * 0.12}
        y={y + height * 0.40}
        scale={1.2}
      />

      <Trees
        x={x + width * 0.18}
        y={y + height * 0.36}
        scale={0.9}
      />

      <Trees
        x={x + width * 0.84}
        y={y + height * 0.38}
        scale={1.1}
      />

      <Trees
        x={x + width * 0.89}
        y={y + height * 0.43}
        scale={0.85}
      />

      {/* Stadium structure */}

      <SeatingBowl
        x={bowlX}
        y={bowlY}
        width={bowlWidth}
        height={bowlHeight}
        tiers={4}
        outerFill="#E6E0D5"
        innerFill="#F8F5EF"
        stroke="#655F56"
      />

      {/* Cricket playing field */}

      <PlayingField
        x={fieldX}
        y={fieldY}
        width={fieldWidth}
        height={fieldHeight}
        fill="#E3E8D8"
        stroke="#919A80"
      />

      {/* Main pavilion */}

      <Pavilion
        x={pavilionX}
        y={pavilionY}
        width={pavilionWidth}
        height={pavilionHeight}
        fill="#F1EDE4"
        stroke="#655F56"
        roofFill="#D5CCBE"
      />

      {/* Floodlight towers */}

      <FloodlightTower
        x={x + width * 0.18}
        y={towerBaseY}
        height={towerHeight}
      />

      <FloodlightTower
        x={x + width * 0.34}
        y={towerBaseY - height * 0.03}
        height={towerHeight * 0.92}
      />

      <FloodlightTower
        x={x + width * 0.66}
        y={towerBaseY - height * 0.03}
        height={towerHeight * 0.92}
      />

      <FloodlightTower
        x={x + width * 0.82}
        y={towerBaseY}
        height={towerHeight}
      />

      {/* Editorial baseline */}

      <line
        x1={x + width * 0.10}
        y1={y + height * 0.79}
        x2={x + width * 0.90}
        y2={y + height * 0.79}
        stroke="#C9C1B4"
        strokeWidth={1}
      />

      {/* Illustration caption */}

      <text
        x={centreX}
        y={y + height * 0.87}
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize={18}
        fontWeight={700}
        letterSpacing={2}
        fill="#4C4841"
      >
        {venue.toUpperCase()}
      </text>

      <text
        x={centreX}
        y={y + height * 0.92}
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize={10}
        fontWeight={600}
        letterSpacing={3}
        fill="#817A70"
      >
        ARCHITECTURAL STUDY · KOLKATA
      </text>
    </g>
  );
}