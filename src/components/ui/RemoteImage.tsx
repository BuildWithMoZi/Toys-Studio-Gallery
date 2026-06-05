import Image, { type ImageProps } from "next/image";
import { assetPath } from "@/lib/utils";

function resolveImageSrc(src: string): string {
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("//")
  ) {
    return src;
  }
  return assetPath(src);
}

/** Next/Image with basePath for local assets + no-referrer for hotlinked URLs. */
export function RemoteImage({
  src,
  alt,
  referrerPolicy,
  ...props
}: Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
}) {
  const resolved = resolveImageSrc(src);
  const isExternal = resolved.startsWith("http");

  return (
    <Image
      src={resolved}
      alt={alt}
      referrerPolicy={
        referrerPolicy ?? (isExternal ? "no-referrer" : undefined)
      }
      {...props}
    />
  );
}
