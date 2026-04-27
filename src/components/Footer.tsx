import { useLanguage } from "@/i18n/LanguageContext";
import Logo from "./Logo";

const Footer = () => {
  const { t } = useLanguage();

  const navItems = [
    { label: t("nav.concept"), href: "#sobre" },
    { label: t("gallery.label"), href: "#galeria" },
    { label: t("nav.apartments"), href: "#apartamentos" },
    { label: t("nav.location"), href: "#localizacao" },
    { label: t("nav.contact"), href: "#contacto" },
  ];

  return (
    <footer className="bg-charcoal text-primary-foreground py-16 md:py-20">
      <div className="px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">
            <div className="flex flex-col items-center md:items-start gap-1 text-primary-foreground">
              <Logo height={22} aria-label="Elocuente" />
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-body text-[10px] tracking-[0.25em] uppercase text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-[10px] text-primary-foreground/40 tracking-wider">
              {t("footer.rights")}
            </p>
            <p className="font-body text-[10px] text-primary-foreground/40 tracking-wider">
              {t("footer.architect")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
