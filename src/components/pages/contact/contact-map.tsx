import Container from '@/src/components/atoms/container';
import { ContactMap } from '@/src/types/page-content/contact-content';

interface Props {
  data: ContactMap;
}

export default function Map({ data }: Props) {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-light text-charcoal mb-4">
            {data.title}
          </h2>
        </div>
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-neutral/10">
          <iframe
            src={data.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación"
          />
        </div>
      </Container>
    </section>
  );
}
