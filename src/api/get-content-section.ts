import environment from '@/src/environment';
import { StrapiResponse } from '@/src/types/strapi';

export async function getContentSection<T>(
  endpoint: string,
  section: string,
  locale: string
): Promise<StrapiResponse<T>> {
  const res = await fetch(
    `${environment.strapi.apiEndpoint}/api/${endpoint}?populate[content][on][${section}][populate][image][populate]=*&locale=${locale}`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error(`Error en API: ${res.status}`);
  }

  return res.json();
}
