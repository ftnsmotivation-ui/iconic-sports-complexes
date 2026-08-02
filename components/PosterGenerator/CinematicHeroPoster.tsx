'use client';

import React from 'react';

import { resolvePosterColours } from './PosterColourDirector';
import type { PosterModel } from './PosterModel';
import { resolvePosterLayout } from './PosterLayoutDirector';
import { resolvePosterStyle } from './PosterStyleProfiles';
import { resolvePosterTypography } from './PosterTypographyDirector';

export interface CinematicHeroPosterProps {
  model: PosterModel;
}

export default function CinematicHeroPoster({ model }: CinematicHeroPosterProps) {
  const { identity, facts, collector, narrative, artwork, direction } = model;
  const { venueName, city, country, competition } = identity;
  const style = resolvePosterStyle(model.styleId);
  const layout = resolvePosterLayout(model.styleId, direction);
  const typography = resolvePosterTypography(model, layout, style);
  const colours = resolvePosterColours(model, style);
  const densityFactLimits = { minimal: 2, balanced: 3, rich: 4 } as const;
  const factLimit = Math.min(style.factLimit, densityFactLimits[direction.informationDensity]);

  return (
    <div
      data-poster-root="true"
      data-venue-mood={direction.moods.join(',')}
      data-illustration-priority={direction.illustrationPriority}
      data-poster-layout={layout.id}
      aria-label={`${venueName} collector poster`}
      title={direction.atmosphere}
      style={{
        width: '100%',
        maxWidth: 800,
        aspectRatio: '800 / 1100',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        background: colours.background,
        color: colours.foreground,
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
          height: layout.heroHeight,
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
          background: colours.heroOverlay,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: colours.vignette,
        }}
      />

      {style.showGrid && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.16,
            backgroundImage: `linear-gradient(${colours.gridLine} 1px,transparent 1px),linear-gradient(90deg,${colours.gridLine} 1px,transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* Collector borders */}
      <div style={{ position: 'absolute', inset: layout.borderInsets[0], border: `1.5px solid ${colours.accent}` }} />
      {layout.borderInsets[1] > 0 && <div style={{ position: 'absolute', inset: layout.borderInsets[1], border: `1px solid ${colours.borderSecondary}` }} />}

      {/* Masthead */}
      <div
        style={{
          position: 'absolute',
          top: 61,
          left: layout.contentInset,
          right: layout.contentInset,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: colours.accent,
          ...typography.masthead,
        }}
      >
        <span>{direction.moods[0] ?? 'Iconic'} · {style.name} Series</span>
        <span style={typography.collector}>No. {collector.number} / 500</span>
      </div>

      {/* Hero title */}
      <div
        style={{
          position: 'absolute',
          left: layout.contentInset,
          right: layout.contentInset,
          top: typography.titleTop,
          textShadow: style.id === 'editorial' ? '0 2px 12px rgba(238,233,221,.8)' : '0 7px 24px rgba(0,0,0,.9)',
        }}
      >
        <div
          style={{
            color: colours.accent,
            marginBottom: 15,
            ...typography.subtitle,
          }}
        >
          {competition}
        </div>

        <div
          style={{
            ...typography.title,
          }}
        >
          {typography.titleLines.map((line) => <div key={line}>{line}</div>)}
        </div>

        <div
          style={{
            marginTop: 19,
            color: colours.accent,
            ...typography.metadata,
          }}
        >
          {city} · {country}
        </div>
      </div>

      {/* Editorial lower panel */}
      <div
        style={{
          position: 'absolute',
          left: layout.contentInset,
          right: layout.contentInset,
          top: layout.lowerPanelTop,
          bottom: 51,
          display: 'grid',
          gridTemplateRows: 'auto auto 1fr auto',
        }}
      >
        <div
          style={{
            height: 2,
            background: `linear-gradient(90deg,transparent,${colours.accent},transparent)`,
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: layout.storyColumns,
            gap: 34,
            paddingTop: 26,
            paddingBottom: 24,
          }}
        >
          <div>
            <div
              style={{
                color: colours.accentMuted,
                marginBottom: 12,
                ...typography.sectionLabel,
              }}
            >
              The Venue
            </div>
            <div
              style={{
                fontStyle: 'italic',
                color: colours.foreground,
                ...typography.quote,
              }}
            >
              “{collector.inscription}”
            </div>
          </div>

          {style.informationDensity !== 'minimal' && <div
            style={{
              borderLeft: `1px solid ${colours.borderSecondary}`,
              paddingLeft: 25,
              color: colours.muted,
              ...typography.body,
            }}
          >
            {narrative.secondaryStory}
          </div>}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${factLimit}, 1fr)`,
            borderTop: `1px solid ${colours.borderSecondary}`,
            borderBottom: `1px solid ${colours.borderSecondary}`,
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
                borderLeft: index ? `1px solid ${colours.borderSecondary}` : 'none',
              }}
            >
              <div
                style={{
                  color: colours.accentMuted,
                  marginBottom: 9,
                  ...typography.factLabel,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  color: colours.foreground,
                  ...typography.factValue,
                  fontSize: value.length > 18 ? 14 : typography.factValue.fontSize,
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
                color: colours.accentMuted,
                ...typography.caption,
              }}
            >
              {direction.moods.slice(0, 3).join(' · ')}
            </div>
            <div
              style={{
                color: colours.subtle,
                marginTop: 7,
                ...typography.micro,
              }}
            >
              {direction.illustrationPriority} study · Museum-quality venue portrait
            </div>
          </div>

          <div
            style={{
              textAlign: 'right',
              color: colours.accentMuted,
              ...typography.micro,
              letterSpacing: '2.3px',
            }}
          >
            {style.editionLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
