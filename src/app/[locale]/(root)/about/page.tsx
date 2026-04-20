import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/src/api/get-page';
import { SectionHero as Hero } from '@/src/types/shared';
import {
  AboutBlocks,
  AboutContent,
} from '@/src/types/page-content/about-content';
import { SectionHero } from '@/src/components/pages';

function renderComponent(component: AboutBlocks, index: number) {
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

export default async function About({ params }: Props) {
  const endpoint = 'about-page';
  const { locale } = await params;
  setRequestLocale(locale);
  const res = await getPage<AboutContent>(endpoint, locale);
  const content = res.data.content;
  return (
    <>
      {content.map((component: AboutBlocks, index: number) =>
        renderComponent(component, index)
      )}
    </>
  );
}
