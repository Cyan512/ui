import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/src/api/get-page';
import { SectionCTA, SectionHero } from '@/src/components/pages';
import { SectionCTA as CTA, SectionHero as Hero } from '@/src/types/shared';
import {
  ContactBlocks,
  ContactContent,
} from '@/src/types/page-content/contact-content';

function renderComponent(component: ContactBlocks, index: number) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'shared.section-hero':
      return <SectionHero key={key} data={component as Hero} />;
    case 'shared.section-cta':
      return <SectionCTA key={key} data={component as CTA} />;
    default:
      return null;
  }
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Contact({ params }: Props) {
  const endpoint = 'contact';
  const { locale } = await params;
  setRequestLocale(locale);
  const res = await getPage<ContactContent>(endpoint, locale);
  const content = res.data.content;
  return (
    <div className="min-h-screen bg-cream">
      {content.map((component: ContactBlocks, index: number) =>
        renderComponent(component, index)
      )}
    </div>
  );
}
