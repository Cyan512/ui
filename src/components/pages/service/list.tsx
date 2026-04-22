import {
  ServiceList,
} from '@/src/types/page-content/service-content';
import { getAllServices } from '@/src/api/get-all-services';
import { ServiceEntity } from '@/src/types/entitys/service.entity';

interface Props {
  data: ServiceList;
  locale: string;
}

export default async function List({ data, locale }: Props) {
  console.log('Current locale:', locale);
  const endpoint = 'services';
  type ServicesResponse = {
  data: ServiceEntity[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

const res = await getAllServices<ServicesResponse>(endpoint, locale);
  const content = res.data;
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.map((service) => (
            <div
              key={service.id}
              className="bg-white p-10 border border-[#E8E4DF] hover:border-gold/50 transition-all group"
            >
              <div className="w-12 h-12 mb-8 flex items-center justify-center border border-[#E8E4DF] group-hover:border-primary transition-colors">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
              </div>
              <h3 className="font-headline text-2xl text-charcoal mb-4">
                {service.title}
              </h3>
              <p className="text-neutral font-light leading-relaxed mb-6">
                {/*  {service.description} */}
              </p>
              <div className="flex items-center gap-2 text-primary">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs tracking-wide">
                  {/* {service.schedule} */}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
