import Link from "next/link";
import { SHOP_BY_AGE } from "@/data/images";
import { RemoteImage } from "@/components/ui/RemoteImage";

export function ShopByAge() {
  return (
    <section
      className="w-full bg-white py-6 md:py-8 lg:py-10"
      aria-label="Shop by age"
    >
      <h2 className="mb-5 px-4 text-center font-display text-xl font-bold text-foreground sm:mb-6 sm:text-2xl md:mb-8 md:text-3xl">
        Shop By Age
      </h2>

      <div className="w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-visible [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max min-w-full gap-2 px-2 sm:grid sm:w-full sm:grid-cols-3 sm:gap-3 sm:px-3 md:grid-cols-6 md:gap-3 lg:gap-4 lg:px-4">
          {SHOP_BY_AGE.map((age) => (
            <Link
              key={age.label}
              href={age.href}
              className="group w-[44vw] max-w-[220px] shrink-0 overflow-hidden rounded-2xl shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-md sm:w-full sm:max-w-none md:rounded-3xl"
            >
              <RemoteImage
                src={age.image}
                alt={age.label}
                width={320}
                height={400}
                className="h-auto w-full"
                sizes="(max-width: 640px) 44vw, (max-width: 1024px) 33vw, 16vw"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
