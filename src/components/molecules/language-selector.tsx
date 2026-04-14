'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSelector() {
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = useLocale();

  const changeLanguage = (newLocale: string) => {
    const newPathname = pathName.replace(`/${currentLocale}`, `/${newLocale}`);

    router.push(newPathname);
  };

  return (
    <select
      className="bg-white rounded px-2 py-1 text-black font-medium"
      onChange={(e) => changeLanguage(e.target.value)}
      value={currentLocale}
    >
      <option value="en">us English</option>
      <option value="es">es Español</option>
    </select>
  );
}
