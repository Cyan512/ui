import { ServicelEntity } from '@/src/types/entitys/service.entity';
import { JSX } from 'react';
import Img from '@/src/components/atoms/img';
import { Button } from '@/src/components/atoms/button';

interface Props {
  data: ServicelEntity;
}
export default function ServiceCard({ data }: Props): JSX.Element {
  return (
    <div className="group h-full flex flex-col bg-white">
      <div className="relative overflow-hidden mb-6">
        <div className="aspect-4/3">
          <Img
            image={data.images[0]}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="p-6 flex flex-col grow">
        <h3 className="text-charcoal font-headline text-xl font-medium mb-3">
          {data.title}
        </h3>
        <p className="text-neutral font-body text-base font-light leading-relaxed mb-6 grow">
          {data.description}
        </p>
        <Button
          link={{
            id: data.id,
            text: 'Ver servicio',
            url: `/service/${data.slug}`,
            isExternal: false,
            type: 'link',
          }}
        />
      </div>
    </div>
  );
}
