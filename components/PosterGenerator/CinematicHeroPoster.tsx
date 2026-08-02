'use client';

import React from 'react';

import { resolvePosterColours } from './PosterColourDirector';
import { resolvePosterConcept } from './PosterConceptDirector';
import HistoricContentModule from './HistoricContentModule';
import PersonalisationModule from './PersonalisationModule';
import type { PosterModel } from './PosterModel';
import { resolvePosterLayout } from './PosterLayoutDirector';
import { resolvePosterStyle } from './PosterStyleProfiles';
import { resolvePosterTypography } from './PosterTypographyDirector';
import { CompassRose, VenueMapEngine } from './VenueMapEngine';

export interface CinematicHeroPosterProps {
  model: PosterModel;
  presentation?: 'preview' | 'export';
}

export default function CinematicHeroPoster({ model, presentation = 'preview' }: CinematicHeroPosterProps) {
  const { identity, facts, collector, narrative, history, illustration, direction, content, personalisation } = model;
  const { venueName, city, country, countryFlag, competition, sport } = identity;
  const style = resolvePosterStyle(model.styleId);
  const concept = resolvePosterConcept(model.conceptId);
  const layout = resolvePosterLayout(model.styleId, direction, concept.layoutId);
  const typography = resolvePosterTypography(model, layout, style, concept);
  const colours = resolvePosterColours(model, style, concept);
  const densityFactLimits = { minimal: 2, balanced: 3, rich: 4 } as const;
  const factLimit = Math.min(style.factLimit, densityFactLimits[direction.informationDensity]);

  return (
    <div
      data-poster-root="true"
      data-venue-mood={direction.moods.join(',')}
      data-illustration-priority={direction.illustrationPriority}
      data-illustration-strategy={illustration.strategy}
      data-poster-layout={layout.id}
      data-poster-concept={concept.id}
      aria-label={`${venueName} collector poster`}
      title={direction.atmosphere}
      style={{
        width: '100%',
        maxWidth: presentation === 'preview' ? 800 : 'none',
        aspectRatio: '800 / 1100',
        margin: presentation === 'preview' ? '0 auto' : 0,
        position: 'relative',
        overflow: 'hidden',
        background: colours.background,
        color: colours.foreground,
        boxShadow: presentation === 'preview' ? '0 28px 80px rgba(0,0,0,.52)' : 'none',
        fontFamily: style.bodyFont,
      }}
    >
      {/* Hero artwork */}
      <img
        src={illustration.assetHref}
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: layout.heroHeight,
          objectFit: 'cover',
          objectPosition: illustration.objectPosition,
          display: 'block',
          transform: `scale(${concept.imageScale || illustration.scale})`,
          filter: concept.imageFilter,
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
        {content.collectorNumber && <span style={typography.collector}>No. {collector.number} / 500</span>}
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
          {content.countryFlag && countryFlag ? `${countryFlag} ` : ''}{city} · {country}
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
          gridTemplateRows: content.venueFacts ? 'auto auto 1fr auto' : 'auto auto 1fr',
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
            gridTemplateColumns: content.historicMoments || content.venueMap || content.compassRose ? layout.storyColumns : '1fr',
            gap: 34,
            paddingTop: 26,
            paddingBottom: 24,
          }}
        >
          <div>
            <PersonalisationModule personalisation={personalisation} fallbackInscription={collector.inscription} accentColor={colours.accentMuted} textColor={colours.foreground} mutedColor={colours.muted} labelStyle={typography.sectionLabel} quoteStyle={typography.quote} bodyStyle={typography.body}/>
          </div>

          {(content.historicMoments || content.venueMap || content.compassRose) && <div
            style={{
              borderLeft: `1px solid ${colours.borderSecondary}`,
              paddingLeft: 25,
            }}
          >
            {content.historicMoments && (
              <HistoricContentModule items={history} fallback={narrative.secondaryStory} limit={direction.informationDensity === 'rich' ? 3 : direction.informationDensity === 'balanced' ? 2 : 1} accentColor={colours.accentMuted} textColor={colours.muted} borderColor={colours.borderSecondary} labelStyle={typography.factLabel} bodyStyle={typography.body}/>
            )}
            {content.venueMap && (
              <svg viewBox="-180 -180 360 360" aria-label={`${venueName} venue map`} style={{ display: 'block', width: content.historicMoments ? 104 : 148, margin: content.historicMoments ? '14px auto 0' : '0 auto' }}>
                <VenueMapEngine sport={sport} venueName={venueName} color={colours.accent} mutedColor={colours.borderSecondary} showCompass={content.compassRose}/>
              </svg>
            )}
            {content.compassRose && !content.venueMap && (
              <svg viewBox="-36 -40 72 76" aria-label="Compass rose" style={{ display: 'block', width: 70, margin: '0 auto' }}><CompassRose color={colours.accent}/></svg>
            )}
          </div>}
        </div>

        {content.venueFacts && <div
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
        </div>}

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
