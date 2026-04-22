import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/src/api/get-page';
import {
  HomeBlocks,
  HomeContent,
  HomeRooms,
  HomeServices,
  HomeTestimonials,
} from '@/src/types/page-content/home-content';
import {
  SectionAbout,
  SectionCTA as CTA,
  SectionHero,
} from '@/src/types/shared';
import {
  About,
  Hero,
  Rooms,
  Services,
  Testimonials,
} from '@/src/components/pages/home';
import { SectionCTA } from '@/src/components/pages';

function renderComponent(component: HomeBlocks, index: number) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'shared.section-hero':
      return <Hero key={key} data={component as SectionHero} />;
    case 'shared.section-about':
      return <About key={key} data={component as SectionAbout} />;
    case 'home.home-rooms':
      return <Rooms key={key} data={component as HomeRooms} />;
    case 'home.home-services':
      return <Services key={key} data={component as HomeServices} />;
    case 'home.home-testimonials':
      return <Testimonials key={key} data={component as HomeTestimonials} />;
    case 'shared.section-cta':
      return <SectionCTA key={key} data={component as CTA} />;
    default:
      return null;
  }
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const endpoint = 'home-page';
  const { locale } = await params;
  setRequestLocale(locale);
  const res = await getPage<HomeContent>(endpoint, locale);
  const content = res.data.content;
  return (
    <div className="min-h-screen bg-cream">
      {content.map((component: HomeBlocks, index: number) =>
        renderComponent(component, index)
      )}
    </div>
  );
}
