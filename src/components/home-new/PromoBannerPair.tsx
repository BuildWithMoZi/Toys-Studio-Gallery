import Image from "next/image";
import Link from "next/link";
import { PROMO_BANNER_PAIR } from "@/data/images";

export function PromoBannerPair() {
  return (
    <section
      className='w-full bg-white py-4 md:py-6 lg:py-8 px-2 sm:px-3 md:px-4 lg:px-5'
      aria-label='Featured collections'>
      <div className='grid w-full grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2 md:gap-3 lg:gap-4'>
        {PROMO_BANNER_PAIR.map((banner) => (
          <Link
            key={banner.image}
            href={banner.href}
            className='group block w-full overflow-hidden rounded-none sm:rounded-2xl md:rounded-3xl'>
            <div className='relative h-[min(56vw,320px)] w-full sm:h-[min(48vw,380px)] md:h-[min(42vw,460px)] lg:h-[min(38vw,520px)]'>
              <Image
                src={banner.image}
                alt={banner.alt}
                fill
                className='object-cover object-center transition-transform duration-300 group-hover:scale-[1.01]'
                sizes='(max-width: 768px) 100vw, 50vw'
                priority
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
