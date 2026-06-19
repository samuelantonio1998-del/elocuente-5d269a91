import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const Navbar = () => {
  const { t } = useLanguage();

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="w-full px-8 lg:px-12 flex items-center justify-end h-20 lg:h-24">
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
