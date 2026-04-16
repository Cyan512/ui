import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/src/api/get-page';
import { SectionCTA, SectionHero } from '@/src/components/pages';
import { CTA, Hero } from '@/src/types/shared';
import { ServiceBlocks, ServiceContent } from '@/src/types/service-content';

function renderComponent(component: ServiceBlocks, index: number) {
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

export default async function Service({ params }: Props) {
  const endpoint = 'room';
  const { locale } = await params;
  setRequestLocale(locale);
  const res = await getPage<ServiceContent>(endpoint, locale);
  const content = res.data.content;
  return (
    <div className="min-h-screen bg-cream">
      {content.map((component: ServiceBlocks, index: number) =>
        renderComponent(component, index)
      )}
    </div>
  );
}
