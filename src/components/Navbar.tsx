import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import logoWhiteAsset from "@/assets/elocuente-261-logo-white.png.asset.json";

const Navbar = () => {
  const { t, lang, setLang } = useLanguage();

  const langs = [
    { code: "pt" as const, label: "PT" },
    { code: "en" as const, label: "EN" },
    { code: "es" as const, label: "ES" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="w-full px-6 sm:px-8 lg:px-12 flex items-center justify-between h-20 lg:h-24 gap-4 sm:gap-6">
        <img
          src={logoWhiteAsset.url}
          alt="Elocuente 261"
          className="h-[22px] w-auto"
        />
        {/* Language selector */}
        <div className="flex items-center gap-3 sm:gap-4">
          {langs.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              type="button"
              aria-pressed={lang === code}
              className={[
                "text-[10px] sm:text-[11px] font-body tracking-[0.2em] uppercase",
                "transition-colors duration-300 cursor-pointer",
                lang === code
                  ? "text-white"
                  : "text-white/50 hover:text-white/80",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>

        <a
          href="#contacto"
          className="text-[11px] font-body tracking-[0.2em] uppercase whitespace-nowrap px-5 py-2.5 bg-gold text-charcoal hover:bg-gold/90 transition-all duration-300"
        >
          {t("nav.cta")}
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
