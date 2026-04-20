import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/src/api/get-page';
import { SectionHero, SectionCTA } from '@/src/components/pages';
import { SectionHero as Hero, SectionCTA as CTA } from '@/src/types/shared';
import {
  FeaturedServices,
  GuestExperience,
  MainServices,
  ServiceBlocks,
  ServiceContent,
  ServiceFAQ,
} from '@/src/types/page-content/service-content';
import {
  Experience,
  FAQ,
  Featured,
  Main,
} from '@/src/components/pages/service';

function renderComponent(component: ServiceBlocks, index: number) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'shared.section-hero':
      return <SectionHero key={key} data={component as Hero} />;
    case 'service.main-services':
      return <Main key={key} data={component as MainServices} />;
    case 'service.featured-services':
      return <Featured key={key} data={component as FeaturedServices} />;
    case 'service.guest-experience':
      return <Experience key={key} data={component as GuestExperience} />;
    case 'service.service-faq':
      return <FAQ key={key} data={component as ServiceFAQ} />;
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
  const endpoint = 'service-page';
  const { locale } = await params;
  setRequestLocale(locale);
  const res = await getPage<ServiceContent>(endpoint, locale);
  const content = res.data.content;
  return (
    <>
      {content.map((component: ServiceBlocks, index: number) =>
        renderComponent(component, index)
      )}
    </>
  );
}
