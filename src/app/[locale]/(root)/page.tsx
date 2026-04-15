import SectionCta from '@/src/components/pages/section-cta';
import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/src/api/get-page';
import { CTA } from '@/src/types/shared';
import {
  HomeAbout,
  HomeBlocks,
  HomeContent,
  HomeHero,
  HomeRooms,
  HomeServices,
  HomeTestimonials,
} from '@/src/types/home-content';
import {
  About,
  Hero,
  Rooms,
  Services,
  Testimonials,
} from '@/src/components/pages/home';

function renderComponent(component: HomeBlocks, index: number) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'home.home-hero':
      return <Hero key={key} data={component as HomeHero} />;
    case 'home.home-about':
      return <About key={key} data={component as HomeAbout} />;
    case 'home.home-rooms':
      return <Rooms key={key} data={component as HomeRooms} />;
    case 'home.home-services':
      return <Services key={key} data={component as HomeServices} />;
    case 'home.home-testimonials':
      return <Testimonials key={key} data={component as HomeTestimonials} />;
    case 'shared.section-cta':
      return <SectionCta key={key} data={component as CTA} />;
    default:
      return null;
  }
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const endpoint = 'home';
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
