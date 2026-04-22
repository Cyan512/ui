import { setRequestLocale } from 'next-intl/server';
import { getPage } from '@/src/api/get-page';
import { SectionHero } from '@/src/components/pages';
import { SectionHero as Hero } from '@/src/types/shared';
import {
  ServiceBlocks,
  ServiceContent, ServiceList,
} from '@/src/types/page-content/service-content';
import {List} from "@/src/components/pages/service"

function renderComponent(component: ServiceBlocks, index: number, locale: string) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'shared.section-hero':
      return <SectionHero key={key} data={component as Hero} />;
    case 'service.service-list':
      return <List key={key} data={component as ServiceList} locale={locale} />;
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
        renderComponent(component, index, locale)
      )}
    </>
  );
}
