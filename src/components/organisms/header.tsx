import { Link } from '@/src/i18n/navigation';
import LanguageSelector from '../molecules/language-selector';

export default function Header() {
  return (
    <header className="container mx-auto mb-7 flex justify-between">
      <div className="flex items-center gap-5">
        <Link
          href="/"
          className="text-xl font-medium hover:underline hover:font-bold"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-xl font-medium hover:underline hover:font-bold"
        >
          About
        </Link>
      </div>

      <LanguageSelector />
    </header>
  );
}
