import { Link } from '@/src/i18n/navigation';
import LanguageSelector from '../molecules/language-selector';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 mb-7 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <nav className="flex items-center gap-1">
          {['Home', 'About', 'RoomEntity', 'Gallery', 'Service', 'Contact'].map(
            (item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-indigo-600"
              >
                {item}
              </Link>
            )
          )}
        </nav>

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
            <span className="text-lg font-bold">Q</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Qorikallpa
          </span>
        </div>

        <LanguageSelector />
      </div>
    </header>
  );
}
