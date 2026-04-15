import environment from '../environment';
import { StrapiResponse } from '../types/strapi';

export async function getPage<T>(
  endpoint: string,
  locale: string
): Promise<StrapiResponse<T>> {
  const res = await fetch(
    `${environment.strapi.apiEndpoint}/api/${endpoint}?populate=*&locale=${locale}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    throw new Error(`Error en API: ${res.status}`);
  }

  return res.json();
}
