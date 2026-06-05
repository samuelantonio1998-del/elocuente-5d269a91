import { Instagram, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import Logo from "./Logo";

const Footer = () => {
  const { t } = useLanguage();

  const navItems = [
    { label: t("nav.development"), href: "#sobre" },
    { label: t("nav.location"), href: "#localizacao" },
    { label: t("nav.units"), href: "#apartamentos" },
    { label: t("nav.gallery"), href: "#galeria" },
    { label: t("nav.contact"), href: "#contacto" },
  ];

  const socials = [
    { icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/", label: "Facebook" },
    { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-charcoal text-primary-foreground py-16 md:py-20">
      <div className="px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <Logo height={22} aria-label="Elocuente" />
              <p className="font-body text-xs text-primary-foreground/50 leading-relaxed mt-6 max-w-[260px]">
                {t("footer.tagline")}
              </p>
            </div>

            <div className="flex flex-col gap-3 md:items-center">
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary-foreground/40 mb-2">
                {t("footer.contacts")}
              </p>
              <a href="tel:+351916422521" className="font-body text-sm text-primary-foreground/80 hover:text-gold transition-colors">
                +351 916 422 521
              </a>
              <a href="mailto:info@elocuente.pt" className="font-body text-sm text-primary-foreground/80 hover:text-gold transition-colors">
                info@elocuente.pt
              </a>
              <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
                Rua do Fagundo, Albergaria<br />Marinha Grande
              </p>
            </div>

            <div className="flex flex-col gap-4 md:items-end">
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary-foreground/40">
                {t("footer.follow")}
              </p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 border border-primary-foreground/15 flex items-center justify-center text-primary-foreground/60 hover:text-gold hover:border-gold/40 transition-colors"
                  >
                    <s.icon size={15} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap justify-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-body text-[10px] tracking-[0.25em] uppercase text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/privacidade"
                className="font-body text-[10px] tracking-[0.25em] uppercase text-primary-foreground/50 hover:text-primary-foreground transition-colors"
              >
                {t("footer.privacy")}
              </Link>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
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
