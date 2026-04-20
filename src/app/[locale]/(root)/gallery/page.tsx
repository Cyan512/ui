import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/src/api/get-page';
import { SectionHero, SectionCTA } from '@/src/components/pages';
import {
  GalleryBlocks,
  GalleryContent,
  GalleryFilters,
  GalleryGrid,
} from '@/src/types/page-content/gallery-content';
import { Filters, Grid } from '@/src/components/pages/gallery';
import { SectionHero as Hero, SectionCTA as CTA } from '@/src/types/shared';
function renderComponent(component: GalleryBlocks, index: number) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'shared.section-hero':
      return <SectionHero key={key} data={component as Hero} />;
    case 'gallery.gallery-filters':
      return <Filters key={key} data={component as GalleryFilters} />;
    case 'gallery.gallery-grid':
      return <Grid key={key} data={component as GalleryGrid} />;
    case 'shared.section-cta':
      return <SectionCTA key={key} data={component as CTA} />;
    default:
      return null;
  }
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Gallery({ params }: Props) {
  const endpoint = 'gallery-page';
  const { locale } = await params;
  setRequestLocale(locale);
  const res = await getPage<GalleryContent>(endpoint, locale);
  const content = res.data.content;
  return (
    <>
      {content.map((component: GalleryBlocks, index: number) =>
        renderComponent(component, index)
      )}
    </>
  );
}
