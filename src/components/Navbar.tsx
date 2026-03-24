import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Conceito", href: "#sobre" },
  { label: "Localização", href: "#localizacao" },
  { label: "Apartamentos", href: "#apartamentos" },
  { label: "Amenidades", href: "#amenidades" },
  { label: "Contacto", href: "#contacto" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        scrolled
          ? "bg-background/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-8 lg:px-16 flex items-center justify-between h-20 lg:h-24">
        {/* Left nav items */}
        <div className="hidden lg:flex items-center gap-12 flex-1">
          {navItems.slice(0, 2).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[11px] font-body tracking-[0.25em] uppercase transition-colors duration-300 ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Center logo */}
        <a href="#" className="flex flex-col items-center gap-0.5 flex-shrink-0">
          <span className={`font-heading text-xl lg:text-2xl tracking-[0.2em] transition-colors duration-500 ${
            scrolled ? "text-foreground" : "text-primary-foreground"
          }`}>
            ELOQUENTE
          </span>
        </a>

        {/* Right nav items */}
        <div className="hidden lg:flex items-center gap-12 flex-1 justify-end">
          {navItems.slice(2, 4).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[11px] font-body tracking-[0.25em] uppercase transition-colors duration-300 ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
            >
              {item.label}
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
            Contacto
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden transition-colors ${
            scrolled ? "text-foreground" : "text-primary-foreground"
          }`}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block py-4 text-sm font-body tracking-[0.25em] uppercase text-primary-foreground/70 hover:text-primary-foreground transition-colors border-b border-primary-foreground/10"
                >
                  {item.label}
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