import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/src/api/get-page';
import {
  SectionHero as Hero,
  SectionCTA as CTA,
  SectionAbout,
} from '@/src/types/shared';
import {
  AboutBlocks,
  AboutContent,
  AboutPhilosophy,
  AboutMetrics,
} from '@/src/types/page-content/about-content';
import { SectionHero, SectionCTA } from '@/src/components/pages';
import { Metrics, History, Philosophy } from '@/src/components/pages/about';

function renderComponent(component: AboutBlocks, index: number) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'shared.section-hero':
      return <SectionHero key={key} data={component as Hero} />;
    case 'shared.section-about':
      return <History key={key} data={component as SectionAbout} />;
    case 'about.about-metrics':
      return <Metrics key={key} data={component as AboutMetrics} />;
    case 'about.about-philosophy':
      return <Philosophy key={key} data={component as AboutPhilosophy} />;
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
