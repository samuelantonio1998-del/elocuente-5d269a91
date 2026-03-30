import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Lang } from "@/i18n/translations";

const navKeys = [
  { key: "nav.concept", href: "#sobre" },
  { key: "nav.location", href: "#localizacao" },
  { key: "nav.apartments", href: "#apartamentos" },
  { key: "nav.amenities", href: "#amenidades" },
  { key: "nav.contact", href: "#contacto" },
];

const langLabels: Record<Lang, string> = { pt: "PT", en: "EN", es: "ES" };

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "bg-background/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="w-full px-8 lg:px-16 flex items-center justify-between h-20 lg:h-24">
        {/* Left nav items */}
        <div className="hidden lg:flex items-center gap-12 flex-1">
          {navKeys.slice(0, 2).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[11px] font-body tracking-[0.25em] uppercase transition-colors duration-300 ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
            >
              {t(item.key)}
            </a>
          ))}
        </div>

        {/* Center logo */}
        <a href="#" className="flex flex-col items-center gap-0.5 flex-shrink-0">
          <span
            className={`font-heading text-xl lg:text-2xl tracking-[0.2em] transition-colors duration-500 ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}
          >
            ELOCUENTE
          </span>
        </a>

        {/* Right nav items */}
        <div className="hidden lg:flex items-center gap-12 flex-1 justify-end">
          {navKeys.slice(2, 4).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[11px] font-body tracking-[0.25em] uppercase transition-colors duration-300 ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
            >
              {t(item.key)}
            </a>
          ))}
          <a
            href="#contacto"
            className={`text-[11px] font-body tracking-[0.25em] uppercase px-6 py-2.5 border transition-all duration-300 ${
              scrolled
                ? "border-foreground/20 text-foreground hover:bg-foreground hover:text-background"
                : "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-charcoal"
            }`}
          >
            {t("nav.contact")}
          </a>

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 text-[11px] font-body tracking-[0.15em] uppercase transition-colors duration-300 ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
              aria-label="Change language"
            >
              <Globe size={14} strokeWidth={1.5} />
              {langLabels[lang]}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 bg-background border border-border shadow-lg min-w-[80px]"
                >
                  {(Object.keys(langLabels) as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setLangOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2.5 font-body text-[11px] tracking-[0.15em] transition-colors ${
                        lang === l
                          ? "text-foreground bg-muted"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {langLabels[l]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className={`flex items-center gap-1 text-[11px] font-body tracking-[0.15em] transition-colors ${
              scrolled
                ? "text-muted-foreground"
                : "text-primary-foreground/70"
            }`}
          >
            <Globe size={14} strokeWidth={1.5} />
            {langLabels[lang]}
          </button>
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

        {/* Mobile lang dropdown */}
        <AnimatePresence>
          {langOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="lg:hidden absolute top-full right-8 mt-1 bg-background border border-border shadow-lg min-w-[80px] z-50"
            >
              {(Object.keys(langLabels) as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setLangOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2.5 font-body text-[11px] tracking-[0.15em] transition-colors ${
                    lang === l
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {langLabels[l]}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
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
              {navKeys.map((item, i) => (
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
