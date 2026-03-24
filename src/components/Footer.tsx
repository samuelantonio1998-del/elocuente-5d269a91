const Footer = () => {
  return (
    <footer className="bg-charcoal text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-baseline gap-2">
            <p className="font-heading text-xl tracking-[0.15em]">MONTE GRANDE</p>
            <p className="font-body text-[10px] text-gold tracking-[0.3em] uppercase">
              Residences
            </p>
          </div>

          <div className="flex gap-10">
            {["Sobre", "Galeria", "Apartamentos", "Localização", "Contacto"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace("ã", "a").replace("ç", "c")}`}
                  className="font-body text-[10px] tracking-[0.2em] uppercase text-primary-foreground/40 hover:text-primary-foreground transition-colors duration-300"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[10px] text-primary-foreground/25 tracking-wider">
            © 2026 Monte Grande Residences. Todos os direitos reservados.
          </p>
          <p className="font-body text-[10px] text-primary-foreground/25 tracking-wider">
            Arquitectura: Tiago Frazão Arquitetos
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
