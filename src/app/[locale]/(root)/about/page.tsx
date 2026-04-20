import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/src/api/get-page';
import { SectionCTA as CTA, SectionHero as Hero } from '@/src/types/shared';
import {
  AboutBlocks,
  AboutContent,
  AboutStory,
} from '@/src/types/page-content/about-content';
import { Story } from '@/src/components/pages/about';
import { SectionHero, SectionCTA } from '@/src/components/pages';

function renderComponent(component: AboutBlocks, index: number) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'shared.section-hero':
      return <SectionHero key={key} data={component as Hero} />;
    case 'about.about-story':
      return <Story key={key} data={component as AboutStory} />;
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
  const endpoint = 'about';
  const { locale } = await params;
  setRequestLocale(locale);
  const res = await getPage<AboutContent>(endpoint, locale);
  const content = res.data.content;
  return (
    <div className="min-h-screen bg-cream">
      {content.map((component: AboutBlocks, index: number) =>
        renderComponent(component, index)
      )}
    </div>
  );
}
