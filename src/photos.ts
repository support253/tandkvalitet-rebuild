/*
  Stock photos (Unsplash, free licence, sources in src/assets/PHOTO-SOURCES.md).

  TEMPORARY (2026-11-06): these load from Unsplash's own image server, because
  the real files could not be pushed through the GitHub connector (binary).
  Before the site goes live for real, upload the files from
  Downloads/tandkvalitet-billeder to src/assets and switch every line below to
  a local import, e.g.  export { default as treatCaries } from './assets/treat-caries.jpg'
  (self-hosting also avoids sending visitors' IPs to a third party).
*/
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`

export const treatImplantSpecial = unsplash('1643662173390-74350a5f6e98')
export const treatImplant = unsplash('1609918438269-9a4c5f8fe3a4')
export const treatCaries = unsplash('1690167687106-180b0ea1d813')
export const treatGums = unsplash('1606811971618-4486d14f3f99')
export const treatRoot = unsplash('1758691461957-13aff0c37c6f')
export const treatCracks = unsplash('1658053734458-3b35d37fac42')
export const treatWisdom = unsplash('1522849696084-818b29dfe210')
export const treatExtraction = unsplash('1654977810620-b68f508f3ac0')
export const treatErosion = unsplash('1629654613528-5d0a2e4166de')
export const treatCosmetic = unsplash('1611166819595-ac34987dfa57')
export const treatCrowns = unsplash('1660300110556-fa3ccf6f4eb1')
export const treatDentures = unsplash('1612283104841-d1918e7666c7')
export const tandlaegeskraekSamtale = unsplash('1659989693409-5adc97274bed')
