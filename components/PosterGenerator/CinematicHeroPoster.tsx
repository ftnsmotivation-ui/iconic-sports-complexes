'use client';

import React from 'react';

export interface CinematicHeroPosterProps {
  venueName: string;
  city: string;
  country: string;
  opened: number | string;
  capacity: number | string;
  competition?: string;
  collectorNumber?: number | string;
  inscription?: string;
  heroImageHref?: string;
  nickname?: string;
  famousFor?: string;
  iconicMoments?: string;
  surface?: string;
  architect?: string;
  styleId?: string;
}

function formatCapacity(value: number | string): string {
  if (typeof value === 'number') return value.toLocaleString();
  const parsed = Number(String(value).replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed.toLocaleString() : String(value);
}

function titleLines(title: string): [string, string?] {
  const words = title.trim().toUpperCase().split(/\s+/);
  if (words.length <= 2) return [words[0] || 'ICONIC', words[1]];
  const split = Math.ceil(words.length / 2);
  return [words.slice(0, split).join(' '), words.slice(split).join(' ')];
}

export default function CinematicHeroPoster({
  venueName,
  city,
  country,
  opened,
  capacity,
  competition = 'ICONIC SPORTING VENUE',
  collectorNumber = 12,
  inscription = 'Where sporting history becomes part of the city.',
  heroImageHref = '/venue-assets/eden-gardens/hero-night.svg',
  nickname,
  famousFor,
  iconicMoments,
  surface,
  architect,
}: CinematicHeroPosterProps) {
  const [lineOne, lineTwo] = titleLines(venueName);
  const edition = String(collectorNumber).padStart(3, '0');
  const secondaryStory =
    iconicMoments ||
    famousFor ||
    nickname ||
    'A stage where generations gathered, records fell and sporting memory became civic history.';

  return (
    <div
      data-poster-root="true"
      aria-label={`${venueName} collector poster`}
      style={{
        width: '100%',
        maxWidth: 800,
        aspectRatio: '800 / 1100',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        background: '#080b0c',
        color: '#f4efe5',
        boxShadow: '0 28px 80px rgba(0,0,0,.52)',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      {/* Hero artwork */}
      <img
        src={heroImageHref}
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '61%',
          objectFit: 'cover',
          objectPosition: 'center 46%',
          display: 'block',
          transform: 'scale(1.035)',
        }}
      />

      {/* Cinematic treatment */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(5,8,9,.08) 0%, rgba(5,8,9,.05) 30%, rgba(5,8,9,.48) 49%, #080a0b 62%, #080a0b 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 25%, transparent 0%, transparent 34%, rgba(0,0,0,.18) 64%, rgba(0,0,0,.58) 100%)',
        }}
      />

      {/* Collector borders */}
      <div style={{ position: 'absolute', inset: 27, border: '1.5px solid #b29248' }} />
      <div style={{ position: 'absolute', inset: 39, border: '1px solid rgba(178,146,72,.43)' }} />

      {/* Masthead */}
      <div
        style={{
          position: 'absolute',
          top: 61,
          left: 57,
          right: 57,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#dbc270',
          fontSize: 10,
          letterSpacing: '3.5px',
          textTransform: 'uppercase',
        }}
      >
        <span>Iconic Sports Complexes · Archive Series</span>
        <span style={{ letterSpacing: '1.8px' }}>No. {edition} / 500</span>
      </div>

      {/* Hero title */}
      <div
        style={{
          position: 'absolute',
          left: 57,
          right: 57,
          top: lineTwo ? '39.5%' : '43%',
          textShadow: '0 7px 24px rgba(0,0,0,.9)',
        }}
      >
        <div
          style={{
            color: '#e0c36e',
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
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontWeight: 700,
            fontSize: lineOne.length > 13 ? 58 : 72,
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
            color: '#e5c978',
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
          left: 57,
          right: 57,
          top: '66.5%',
          bottom: 51,
          display: 'grid',
          gridTemplateRows: 'auto auto 1fr auto',
        }}
      >
        <div
          style={{
            height: 2,
            background: 'linear-gradient(90deg,#6f5520,#e1c56f,#6f5520)',
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr .8fr',
            gap: 34,
            paddingTop: 26,
            paddingBottom: 24,
          }}
        >
          <div>
            <div
              style={{
                color: '#bda45e',
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
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 21,
                lineHeight: 1.32,
                fontStyle: 'italic',
                color: '#f0ece4',
              }}
            >
              “{inscription}”
            </div>
          </div>

          <div
            style={{
              borderLeft: '1px solid rgba(180,150,76,.42)',
              paddingLeft: 25,
              color: '#aaa596',
              fontSize: 11,
              lineHeight: 1.55,
            }}
          >
            {secondaryStory}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: '1px solid rgba(180,150,76,.38)',
            borderBottom: '1px solid rgba(180,150,76,.38)',
          }}
        >
          {[
            ['Opened', String(opened)],
            ['Capacity', formatCapacity(capacity)],
            ['Surface', surface || 'International standard'],
            ['Architect', architect || 'Historic development'],
          ].map(([label, value], index) => (
            <div
              key={label}
              style={{
                padding: '19px 16px 18px',
                borderLeft: index ? '1px solid rgba(180,150,76,.28)' : 'none',
              }}
            >
              <div
                style={{
                  color: '#9b8448',
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
                  color: '#f1ede5',
                  fontFamily: 'Georgia, "Times New Roman", serif',
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
                color: '#b99c51',
                fontSize: 8.5,
                letterSpacing: '2.7px',
                textTransform: 'uppercase',
              }}
            >
              Heritage · Architecture · Sporting Memory
            </div>
            <div
              style={{
                color: '#6f654d',
                fontSize: 8,
                letterSpacing: '1.6px',
                marginTop: 7,
                textTransform: 'uppercase',
              }}
            >
              Museum-quality venue portrait
            </div>
          </div>

          <div
            style={{
              textAlign: 'right',
              color: '#75643a',
              fontSize: 8,
              letterSpacing: '2.3px',
              textTransform: 'uppercase',
            }}
          >
            Cinematic Night Edition
          </div>
        </div>
      </div>
    </div>
  );
}
