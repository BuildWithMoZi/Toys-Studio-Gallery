/** Toy catalog images (Pinterest) — single source for the site */
export const TOY_IMAGES = [
  "https://i.pinimg.com/736x/5f/d5/8f/5fd58ff149f2ff347c0f1a7ea0e9bb5d.jpg",
  "https://i.pinimg.com/736x/6f/3f/d8/6f3fd87f311263ebc2dcbf4d8071d502.jpg",
  "https://i.pinimg.com/736x/fa/b7/90/fab790d0abc78441f64eb2ee33aa5fbf.jpg",
  "https://i.pinimg.com/1200x/52/82/10/5282108c34a3e7bddf7af9a4b8a148a2.jpg",
  "https://i.pinimg.com/736x/5a/ec/51/5aec515227f76aac7f887503be7c2675.jpg",
  "https://i.pinimg.com/736x/43/fb/02/43fb02c10f93cc474ca61cb6534bd351.jpg",
  "https://i.pinimg.com/1200x/c2/5d/5d/c25d5df913dc3bb9dcd7cc4f2a29c370.jpg",
  "https://i.pinimg.com/736x/4a/da/fa/4adafa4a369bdd685ff57901999f46b9.jpg",
  "https://i.pinimg.com/1200x/f6/4d/8f/f64d8f16043a4e3882e71d633c20277c.jpg",
  "https://i.pinimg.com/736x/fa/4e/58/fa4e58d672dad21b87478ed095cbfb9b.jpg",
  "https://i.pinimg.com/736x/11/ca/67/11ca67b7cfe0fb63ea6686ea54a3af05.jpg",
  "https://i.pinimg.com/736x/61/3f/3b/613f3b10856aa0e89c3210ce6d1c782c.jpg",
  "https://i.pinimg.com/736x/b2/59/c0/b259c04d31e7444be98b24d24bfc259c.jpg",
  "https://i.pinimg.com/736x/ab/52/e8/ab52e8c8163e111d34ca0dd0e602ffd2.jpg",
  "https://i.pinimg.com/736x/6d/72/35/6d7235358a3a9637717a5a3dcad93c9b.jpg",
  "https://i.pinimg.com/736x/75/85/51/758551517c5adb38e6959ec6ca6cb2d8.jpg",
  "https://i.pinimg.com/736x/f3/61/93/f36193efef575d33c090af1fff5fdb3a.jpg",
  "https://i.pinimg.com/736x/b1/c1/1a/b1c11a6c4b57f61e5dd9aef4d67008a3.jpg",
  "https://i.pinimg.com/736x/0a/cf/01/0acf01ff338f715a296a91b59b5e8cf8.jpg",
  "https://i.pinimg.com/736x/ec/76/bf/ec76bf57c07e6be5b0384046f9f3991d.jpg",
  "https://i.pinimg.com/736x/db/aa/31/dbaa310f2de2f5b9ba58a53a55edd304.jpg",
  "https://i.pinimg.com/736x/30/68/42/306842775ad894f11dfde925642e438f.jpg",
  "https://i.pinimg.com/736x/20/59/17/2059172185b8edeec5069090128197df.jpg",
  "https://i.pinimg.com/736x/6f/e5/73/6fe5735ca5111c3030af44cbd84ee977.jpg",
  "https://i.pinimg.com/1200x/ef/f4/17/eff41710d0772a6f2fc1426a5dc654a9.jpg",
  "https://i.pinimg.com/1200x/91/d8/59/91d859a51874228e0b77988e68680c5f.jpg",
  "https://i.pinimg.com/736x/d7/db/eb/d7dbebd4fa5e01e846c62b4adb17da88.jpg",
  "https://i.pinimg.com/736x/44/28/b3/4428b3fd22f62e10c39394ac13180453.jpg",
  "https://i.pinimg.com/1200x/14/90/44/1490445d5a8fab31855ba2f867d1a82f.jpg",
] as const;

/** Hero + content area background */
export const HERO_IMAGE = TOY_IMAGES[18];

export function toyImage(index: number): string {
  return TOY_IMAGES[index % TOY_IMAGES.length]!;
}

export function toyImagePair(
  first: number,
  second: number
): [string, string] {
  return [toyImage(first), toyImage(second)];
}
