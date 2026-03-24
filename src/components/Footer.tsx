const Footer = () => {
  return (
    <footer className="bg-charcoal text-primary-foreground py-16 md:py-20">
      <div className="px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Top */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="font-heading text-xl tracking-[0.2em]">MONTE GRANDE</p>
              <p className="font-body text-[8px] tracking-[0.5em] uppercase text-primary-foreground/50">
                Residences
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {[
                { label: "Conceito", href: "#sobre" },
                { label: "Galeria", href: "#galeria" },
                { label: "Apartamentos", href: "#apartamentos" },
                { label: "Localização", href: "#localizacao" },
                { label: "Contacto", href: "#contacto" },
              ].map((item) => (
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

          {/* Bottom */}
          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-[10px] text-primary-foreground/40 tracking-wider">
              © 2026 Monte Grande Residences. Todos os direitos reservados.
            </p>
            <p className="font-body text-[10px] text-primary-foreground/40 tracking-wider">
              Arquitectura: Tiago Frazão Arquitetos
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;