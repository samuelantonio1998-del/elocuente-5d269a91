import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Lang } from "@/i18n/translations";
import logoAsset from "@/assets/elocuente-logo-transparent.png.asset.json";

const leftNavKeys = [
  { key: "nav.promoter", href: "#promotor" },
  { key: "nav.location", href: "#localizacao" },
  { key: "nav.architecture", href: "#arquitetura" },
];

const rightNavKeys = [
  { key: "nav.availability", href: "#disponibilidades" },
  { key: "nav.features", href: "#empreendimento" },
  { key: "nav.gallery", href: "#galeria" },
];

const allNavKeys = [...leftNavKeys, ...rightNavKeys];

const langLabels: Record<Lang, string> = { pt: "PT", en: "EN", es: "ES" };
const langOrder: Lang[] = ["pt", "en", "es"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LangSwitcher = ({ compact = false }: { compact?: boolean }) => (
    <div
      className="flex flex-col items-center gap-1 leading-none"
      role="group"
      aria-label="Change language"
    >
      {langOrder.map((l) => {
        const isActive = lang === l;
        const inactiveColor = scrolled
          ? "text-muted-foreground hover:text-foreground"
          : "text-primary-foreground/60 hover:text-primary-foreground";
        const activeColor = "text-gold";
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={isActive}
            aria-label={`Switch to ${langLabels[l]}`}
            className={`text-[10px] font-body tracking-[0.2em] uppercase transition-colors duration-300 ${
              isActive ? activeColor : inactiveColor
            }`}
          >
            {langLabels[l]}
          </button>
        );
      })}
    </div>
  );

  const linkClass = `text-[11px] font-body tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300 ${
    scrolled
      ? "text-muted-foreground hover:text-foreground"
      : "text-primary-foreground/70 hover:text-primary-foreground"
  }`;

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "bg-background/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="w-full px-8 lg:px-12 flex items-center justify-between h-20 lg:h-24 gap-8">
        {/* Desktop left nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-9 flex-1">
          {leftNavKeys.map((item) => (
            <a key={item.href} href={item.href} className={linkClass}>
              {t(item.key)}
            </a>
          ))}
        </div>

        {/* Centered logo */}
        <a
          href="#hero"
          aria-label="Elocuente"
          className="flex-shrink-0 flex items-center justify-center"
        >
          <img
            src={logoAsset.url}
            alt="Elocuente"
            className="h-7 md:h-8 lg:h-9 w-auto select-none"
            draggable={false}
          />
        </a>

        {/* Desktop right nav + CTA + lang */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-9 flex-1 justify-end">
          {rightNavKeys.map((item) => (
            <a key={item.href} href={item.href} className={linkClass}>
              {t(item.key)}
            </a>
          ))}

          <a
            href="#contacto"
            className="text-[11px] font-body tracking-[0.2em] uppercase whitespace-nowrap px-5 py-2.5 bg-gold text-charcoal hover:bg-gold/90 transition-all duration-300"
          >
            {t("nav.cta")}
          </a>

          <LangSwitcher />
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="lg:hidden flex items-center gap-4">
          <LangSwitcher compact />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`transition-colors ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-charcoal overflow-hidden"
          >
            <div className="px-8 py-10 space-y-1">
              {allNavKeys.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block py-4 text-sm font-body tracking-[0.25em] uppercase text-primary-foreground/70 hover:text-primary-foreground transition-colors border-b border-primary-foreground/10"
                >
                  {t(item.key)}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
