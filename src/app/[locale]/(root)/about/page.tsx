import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/src/api/get-page';
import { SectionHero as Hero, SectionCTA as CTA } from '@/src/types/shared';
import {
  AboutBlocks,
  AboutContent,
  AboutPhilosophy as Philosophy,
  AboutHistory as History,
  AboutLocation as Location,
} from '@/src/types/page-content/about-content';
import { SectionHero, SectionCTA } from '@/src/components/pages';
import AboutHistory from '@/src/components/pages/about/history';
import AboutPhilosophy from '@/src/components/pages/about/philosophy';
import AboutLocation from '@/src/components/pages/about/location';

function renderComponent(component: AboutBlocks, index: number) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'shared.section-hero':
      return <SectionHero key={key} data={component as Hero} />;
    case 'about.about-history':
      return <AboutHistory key={key} data={component as History} />;
    case 'about.about-philosophy':
      return <AboutPhilosophy key={key} data={component as Philosophy} />;
    case 'about.about-location':
      return <AboutLocation key={key} data={component as Location} />;
    case 'shared.section-cta':
      return <SectionCTA key={key} data={component as CTA} />;
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
