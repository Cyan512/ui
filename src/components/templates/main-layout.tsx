import { ReactNode } from 'react';
import Header from '@/src/components/organisms/header';
import Footer from '@/src/components/organisms/footer';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="min-h-screen bg-cream">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
