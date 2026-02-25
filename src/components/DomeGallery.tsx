import React, { useMemo } from 'react';
import './DomeGallery.css';

type ImageItem = string | { src: string; alt?: string };

type DomeGalleryProps = {
  images?: ImageItem[];
  imageBorderRadius?: string;
  grayscale?: boolean;
};

type NormalizedImage = { src: string; alt: string };

const DEFAULT_IMAGES: ImageItem[] = [];

const normalizeImages = (images: ImageItem[]): NormalizedImage[] =>
  images
    .map((image, i) =>
      typeof image === 'string'
        ? { src: image, alt: `Gallery image ${i + 1}` }
        : { src: image.src || '', alt: image.alt || `Gallery image ${i + 1}` }
    )
    .filter(i => !!i.src);

const spreadDuplicates = (items: NormalizedImage[]) => {
  if (items.length < 2) return items;
  const out = [...items];
  for (let i = 1; i < out.length; i++) {
    if (out[i].src !== out[i - 1].src) continue;
    for (let j = i + 1; j < out.length; j++) {
      if (out[j].src !== out[i - 1].src) {
        const t = out[i];
        out[i] = out[j];
        out[j] = t;
        break;
      }
    }
  }
  return out;
};

const splitRows = (items: NormalizedImage[]) => {
  const top: NormalizedImage[] = [];
  const bottom: NormalizedImage[] = [];
  for (let i = 0; i < items.length; i++) {
    if (i % 2 === 0) top.push(items[i]);
    else bottom.push(items[i]);
  }
  if (top.length === 0) top.push(...items);
  if (bottom.length === 0) bottom.push(...top);
  return { top, bottom };
};

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  imageBorderRadius = '22px',
  grayscale = false
}: DomeGalleryProps) {
  const normalized = useMemo(() => spreadDuplicates(normalizeImages(images)), [images]);
  const { top, bottom } = useMemo(() => splitRows(normalized), [normalized]);
  const imageFilter = grayscale ? 'grayscale(1)' : 'none';

  if (normalized.length === 0) {
    return <div className="marquee-empty">Add images to show gallery.</div>;
  }

  const renderRow = (row: NormalizedImage[], reverse = false) => (
    <div className={`marquee-row ${reverse ? 'is-reverse' : ''}`}>
      <div className="marquee-track">
        {[...row, ...row].map((img, idx) => (
          <article
            key={`${img.src}-${idx}`}
            className="marquee-card"
            style={{ borderRadius: imageBorderRadius } as React.CSSProperties}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading={idx < 4 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              style={{ filter: imageFilter }}
            />
          </article>
        ))}
      </div>
    </div>
  );

  return (
    <section className="marquee-gallery" aria-label="Gallery slideshow">
      <div className="marquee-glow" />
      {renderRow(top, false)}
      {renderRow(bottom, true)}
    </section>
  );
}
