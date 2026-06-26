export type SiteGalleryEntry = {
  key: string;
  section: string;
  label: string;
};

export const SITE_GALLERIES: SiteGalleryEntry[] = [
  { key: "galeria.principal", section: "Galeria", label: "Galeria principal" },
  { key: "apartamento.interiores", section: "O Apartamento", label: "Interiores do apartamento" },
  { key: "condominio.exterior", section: "O Condomínio", label: "Exterior do condomínio" },
  { key: "vida.envolvente", section: "A Vida no Elocuente", label: "Envolvente" },
  { key: "arquitetura.exterior", section: "A Arquitetura", label: "Exterior / Arquitetura" },
  { key: "localizacao.envolvente", section: "Localização", label: "Envolvente / Localização" },
];

export const SITE_GALLERY_SECTIONS = Array.from(
  new Set(SITE_GALLERIES.map((g) => g.section))
);
