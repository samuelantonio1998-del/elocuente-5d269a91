const Footer = () => {
  return (
    <footer className="bg-charcoal text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-heading text-2xl tracking-wider">AURORA</p>
            <p className="font-body text-xs text-primary-foreground/50 mt-2 tracking-wider">
              RESIDÊNCIAS DE EXCELÊNCIA
            </p>
          </div>

          <div className="flex gap-10">
            {["Sobre", "Apartamentos", "Amenidades", "Localização", "Contacto"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace("ã", "a").replace("ç", "c")}`}
                  className="font-body text-xs tracking-widest uppercase text-primary-foreground/50 hover:text-gold transition-colors duration-300"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="font-body text-xs text-primary-foreground/30">
            © 2026 Aurora Residences. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
