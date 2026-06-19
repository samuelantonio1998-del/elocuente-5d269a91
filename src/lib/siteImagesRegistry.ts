export type SiteImageEntry = {
  key: string;
  section: string;
  label: string;
};

export const SITE_IMAGES: SiteImageEntry[] = [
  { key: "hero.main", section: "Hero", label: "Imagem de fundo do hero" },

  { key: "about.render-1", section: "Sobre / Promotor / Arquitetura", label: "Render 1 (carrossel partilhado)" },
  { key: "about.render-2", section: "Sobre / Promotor / Arquitetura", label: "Render 2 (carrossel partilhado)" },
  { key: "about.render-3", section: "Sobre / Promotor / Arquitetura", label: "Render 3 (carrossel partilhado)" },

  { key: "promoter.photo", section: "O Promotor", label: "Fotografia do promotor" },

  { key: "apartment.1", section: "Tipologias", label: "Tipologia 1" },
  { key: "apartment.2", section: "Tipologias", label: "Tipologia 2" },

  { key: "condo.1", section: "Condomínio", label: "Imagem 1" },
  { key: "condo.2", section: "Condomínio", label: "Imagem 2" },
  { key: "condo.3", section: "Condomínio", label: "Imagem 3" },

  { key: "life.1", section: "Viver no Elocuente", label: "Imagem 1" },
  { key: "life.2", section: "Viver no Elocuente", label: "Imagem 2" },

  { key: "amenities.gardens", section: "Amenidades", label: "Jardins" },
  { key: "amenities.parking", section: "Amenidades", label: "Estacionamento" },
  { key: "amenities.balconies", section: "Amenidades", label: "Varandas" },
  { key: "amenities.security", section: "Amenidades", label: "Segurança" },
];

export const SITE_IMAGE_SECTIONS = Array.from(
  new Set(SITE_IMAGES.map((i) => i.section))
);
