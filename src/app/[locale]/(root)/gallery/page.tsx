import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/src/api/get-page';
import { SectionHero } from '@/src/components/pages';
import { SectionHero as Hero } from '@/src/types/shared';
import {
  GalleryBlocks,
  GalleryContent,
} from '@/src/types/page-content/gallery-content';

function renderComponent(component: GalleryBlocks, index: number) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'shared.section-hero':
      return <SectionHero key={key} data={component as Hero} />;
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
