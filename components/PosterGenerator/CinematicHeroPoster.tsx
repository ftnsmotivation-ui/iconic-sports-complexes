'use client';

import React from 'react';

import type { PosterModel } from './PosterModel';
import { resolvePosterStyle } from './PosterStyleProfiles';

export interface CinematicHeroPosterProps {
  model: PosterModel;
}

function titleLines(title: string): [string, string?] {
  const words = title.trim().toUpperCase().split(/\s+/);
  if (words.length <= 2) return [words[0] || 'ICONIC', words[1]];
  const split = Math.ceil(words.length / 2);
  return [words.slice(0, split).join(' '), words.slice(split).join(' ')];
}

export default function CinematicHeroPoster({ model }: CinematicHeroPosterProps) {
  const { identity, facts, collector, narrative, artwork, direction } = model;
  const { venueName, city, country, competition } = identity;
  const style = resolvePosterStyle(model.styleId);
  const accent = direction.colourPalette[1] ?? style.accent;
  const background = model.styleId === 'collector' ? direction.colourPalette[0] ?? style.background : style.background;
  const foreground = model.styleId === 'collector' ? direction.colourPalette[2] ?? style.foreground : style.foreground;
  const densityFactLimits = { minimal: 2, balanced: 3, rich: 4 } as const;
  const factLimit = Math.min(style.factLimit, densityFactLimits[direction.informationDensity]);
  const [lineOne, lineTwo] = titleLines(venueName);

  return (
    <div
      data-poster-root="true"
      data-venue-mood={direction.moods.join(',')}
      data-illustration-priority={direction.illustrationPriority}
      aria-label={`${venueName} collector poster`}
      title={direction.atmosphere}
      style={{
        width: '100%',
        maxWidth: 800,
        aspectRatio: '800 / 1100',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        background,
        color: foreground,
        boxShadow: '0 28px 80px rgba(0,0,0,.52)',
        fontFamily: style.bodyFont,
      }}
    >
      {/* Hero artwork */}
      <img
        src={artwork.heroImageHref}
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: style.heroHeight,
          objectFit: 'cover',
          objectPosition: direction.heroObjectPosition,
          display: 'block',
          transform: 'scale(1.035)',
        }}
      />

      {/* Cinematic treatment */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: style.heroOverlay,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: style.vignette,
        }}
      />

      {style.showGrid && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.16,
            backgroundImage: 'linear-gradient(rgba(209,183,122,.45) 1px,transparent 1px),linear-gradient(90deg,rgba(209,183,122,.45) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* Collector borders */}
      <div style={{ position: 'absolute', inset: style.borderInsets[0], border: `1.5px solid ${accent}` }} />
      {style.borderInsets[1] > 0 && <div style={{ position: 'absolute', inset: style.borderInsets[1], border: `1px solid ${style.borderSecondary}` }} />}

      {/* Masthead */}
      <div
        style={{
          position: 'absolute',
          top: 61,
          left: style.contentInset,
          right: style.contentInset,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: accent,
          fontSize: 10,
          letterSpacing: '3.5px',
          textTransform: 'uppercase',
        }}
      >
        <span>{direction.moods[0] ?? 'Iconic'} · {style.name} Series</span>
        <span style={{ letterSpacing: '1.8px' }}>No. {collector.number} / 500</span>
      </div>

      {/* Hero title */}
      <div
        style={{
          position: 'absolute',
          left: style.contentInset,
          right: style.contentInset,
          top: lineTwo ? style.titleTop[0] : style.titleTop[1],
          textShadow: style.id === 'editorial' ? '0 2px 12px rgba(238,233,221,.8)' : '0 7px 24px rgba(0,0,0,.9)',
        }}
      >
        <div
          style={{
            color: accent,
            fontSize: 12,
            letterSpacing: '4.2px',
            textTransform: 'uppercase',
            marginBottom: 15,
          }}
        >
          {competition}
        </div>

        <div
          style={{
            fontFamily: direction.titleFont,
            fontWeight: 700,
            fontSize: (lineOne.length > 13 ? 58 : 72) * style.titleScale,
            lineHeight: 0.91,
            letterSpacing: '-1.6px',
            textTransform: 'uppercase',
          }}
        >
          <div>{lineOne}</div>
          {lineTwo && <div>{lineTwo}</div>}
        </div>

        <div
          style={{
            marginTop: 19,
            color: accent,
            fontSize: 13,
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          {city} · {country}
        </div>
      </div>

      {/* Editorial lower panel */}
      <div
        style={{
          position: 'absolute',
          left: style.contentInset,
          right: style.contentInset,
          top: style.lowerPanelTop,
          bottom: 51,
          display: 'grid',
          gridTemplateRows: 'auto auto 1fr auto',
        }}
      >
        <div
          style={{
            height: 2,
            background: `linear-gradient(90deg,transparent,${accent},transparent)`,
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: style.informationDensity === 'minimal' ? '1fr' : '1.2fr .8fr',
            gap: 34,
            paddingTop: 26,
            paddingBottom: 24,
          }}
        >
          <div>
            <div
              style={{
                color: style.accentMuted,
                fontSize: 10,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              The Venue
            </div>
            <div
              style={{
                fontFamily: direction.titleFont,
                fontSize: 21,
                lineHeight: 1.32,
                fontStyle: 'italic',
                color: foreground,
              }}
            >
              “{collector.inscription}”
            </div>
          </div>

          {style.informationDensity !== 'minimal' && <div
            style={{
              borderLeft: `1px solid ${style.borderSecondary}`,
              paddingLeft: 25,
              color: style.muted,
              fontSize: 11,
              lineHeight: 1.55,
            }}
          >
            {narrative.secondaryStory}
          </div>}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${factLimit}, 1fr)`,
            borderTop: `1px solid ${style.borderSecondary}`,
            borderBottom: `1px solid ${style.borderSecondary}`,
          }}
        >
          {[
            ['Opened', facts.opened],
            ['Capacity', facts.capacity],
            ['Surface', facts.surface],
            ['Architect', facts.architect],
          ].slice(0, factLimit).map(([label, value], index) => (
            <div
              key={label}
              style={{
                padding: '19px 16px 18px',
                borderLeft: index ? `1px solid ${style.borderSecondary}` : 'none',
              }}
            >
              <div
                style={{
                  color: style.accentMuted,
                  fontSize: 8.5,
                  letterSpacing: '2.2px',
                  textTransform: 'uppercase',
                  marginBottom: 9,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  color: foreground,
                  fontFamily: direction.titleFont,
                  fontSize: value.length > 18 ? 14 : 20,
                  lineHeight: 1.12,
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            alignSelf: 'end',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingTop: 19,
          }}
        >
          <div>
            <div
              style={{
                color: style.accentMuted,
                fontSize: 8.5,
                letterSpacing: '2.7px',
                textTransform: 'uppercase',
              }}
            >
              {direction.moods.slice(0, 3).join(' · ')}
            </div>
            <div
              style={{
                color: style.subtle,
                fontSize: 8,
                letterSpacing: '1.6px',
                marginTop: 7,
                textTransform: 'uppercase',
              }}
            >
              {direction.illustrationPriority} study · Museum-quality venue portrait
            </div>
          </div>

          <div
            style={{
              textAlign: 'right',
              color: style.accentMuted,
              fontSize: 8,
              letterSpacing: '2.3px',
              textTransform: 'uppercase',
            }}
          >
            {style.editionLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
