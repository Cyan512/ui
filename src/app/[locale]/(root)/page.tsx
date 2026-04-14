import { getPage } from '@/src/api/get-page';
import HomeHero from '@/src/components/pages/home/home-hero';
import {
  HomeContent,
  HomeHero as HomeHeroType,
} from '@/src/types/home-content';
import { setRequestLocale } from 'next-intl/server';

function renderComponent(
  component: HomeHeroType,
  endpoint: string,
  locale: string
) {
  switch (component.__component) {
    case 'home.home-hero':
      return (
        <HomeHero
          key={component.id}
          data={component}
          endpoint={endpoint}
          locale={locale}
        />
      );

    default:
      return null;
  }
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const res = await getPage<HomeContent>('home', locale);
  const content = res.data.content;
  const endpoint = 'home';
  return (
    <div className="min-h-screen bg-cream">
      {content.map((component: HomeHeroType) =>
        renderComponent(component, endpoint, locale)
      )}
    </div>
  );
}
