import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, Home, Euro, Car, Compass } from "lucide-react";
import { Helmet } from "react-helmet-async";
import heroImage from "@/assets/render-front.jpg";
import interiorImage from "@/assets/interior-living.jpg";
import aerialImage from "@/assets/render-aerial.jpg";
import { units, PRICE_PER_SQM, MIN_PRICE } from "@/data/units";
import { useLanguage } from "@/i18n/LanguageContext";

const SITE_URL = "https://elocuente.lovable.app";
const PATH = "/new-build-apartments-silver-coast-portugal";

const SilverCoastLanding = () => {
  const { setLang } = useLanguage();

  useEffect(() => {
    setLang("en");
    document.documentElement.lang = "en";
    window.scrollTo({ top: 0 });
  }, [setLang]);

  // Compute typology bands from real unit data
  const t2 = units.filter((u) => u.type === "T2");
  const t3 = units.filter((u) => u.type === "T3");
  const t2Areas = t2.map((u) => parseFloat(u.area));
  const t3Areas = t3.map((u) => parseFloat(u.area));
  const t2Min = Math.min(...t2Areas);
  const t2Max = Math.max(...t2Areas);
  const t3Min = Math.min(...t3Areas);
  const t3Max = Math.max(...t3Areas);
  const t2PriceMin = Math.max(t2Min * PRICE_PER_SQM, MIN_PRICE);
  const t2PriceMax = Math.max(t2Max * PRICE_PER_SQM, MIN_PRICE);
  const t3PriceMin = Math.max(t3Min * PRICE_PER_SQM, MIN_PRICE);
  const t3PriceMax = Math.max(t3Max * PRICE_PER_SQM, MIN_PRICE);

  const fmtEur = (n: number) =>
    new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  const url = `${SITE_URL}${PATH}`;
  const metaTitle = "New Build Apartments on Portugal's Silver Coast | Elocuente";
  const metaDescription =
    "Contemporary 2 & 3-bedroom new build apartments on Portugal's Silver Coast — minutes from Leiria, São Pedro de Moel and the Atlantic. From €290,000.";

  const residenceLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: "Elocuente — New Build Apartments, Silver Coast Portugal",
    description: metaDescription,
    url,
    numberOfAccommodationUnits: units.length,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marinha Grande",
      addressRegion: "Leiria",
      addressCountry: "PT",
    },
    image: `${SITE_URL}/og-home.jpg`,
    makesOffer: [
      {
        "@type": "Offer",
        name: "2-Bedroom Apartment (T2)",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: t2PriceMin,
          maxPrice: t2PriceMax,
          priceCurrency: "EUR",
        },
      },
      {
        "@type": "Offer",
        name: "3-Bedroom Apartment (T3)",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: t3PriceMin,
          maxPrice: t3PriceMax,
          priceCurrency: "EUR",
        },
      },
    ],
  };

  return (
    <main className="bg-background">
      <Helmet>
        <html lang="en" />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE_URL}/og-home.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <script type="application/ld+json">{JSON.stringify(residenceLd)}</script>
      </Helmet>

      {/* Hero */}
      <header className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
        <img
          src={heroImage}
          alt="Elocuente contemporary new build apartments on Portugal's Silver Coast"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative z-10 flex flex-col items-start justify-end h-full text-left px-6 md:px-16 lg:px-24 pb-16 md:pb-24 max-w-5xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body text-[10px] tracking-[0.3em] uppercase text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />
            Back to Elocuente
          </Link>
          <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold mb-6">
            Silver Coast · Central Portugal
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05] max-w-4xl">
            New Build Apartments on Portugal's Silver Coast
          </h1>
          <p className="font-body font-light text-base md:text-xl text-primary-foreground/80 mt-8 max-w-2xl leading-relaxed">
            Contemporary 2 and 3-bedroom homes a few minutes from Leiria and the Atlantic
            — designed for buyers who want light, space and proximity to the ocean, without
            the crowds of Lisbon or the Algarve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-charcoal font-body text-[10px] tracking-[0.3em] uppercase hover:bg-primary-foreground transition-colors"
            >
              Request information
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
            <Link
              to="/#availability"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-primary-foreground/30 font-body text-[10px] tracking-[0.3em] uppercase text-primary-foreground hover:bg-primary-foreground hover:text-charcoal transition-colors"
            >
              View availability
            </Link>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="px-6 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <p className="font-body text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-6">
            About Elocuente
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground leading-[1.15] mb-8">
            A quiet residential development between Leiria and the Atlantic
          </h2>
          <div className="space-y-5 font-body text-foreground/85 leading-[1.9] text-base">
            <p>
              Elocuente is a new build residential development in Marinha Grande, on Portugal's
              Silver Coast (Costa de Prata). Twenty-three contemporary apartments — two- and
              three-bedroom — designed around natural light, generous floor plates and private
              outdoor space.
            </p>
            <p>
              The location is the point: a short drive from the historic city of Leiria, ten
              minutes from the long Atlantic beaches of São Pedro de Moel and Praia da Vieira,
              and within easy reach of Lisbon and Porto via the A8 and A17 motorways. It suits
              buyers looking for a primary residence, a relocation base under Portugal's new
              IFICI tax regime, or a low-maintenance holiday home with year-round appeal.
            </p>
          </div>
        </div>
      </section>

      {/* Typologies & pricing */}
      <section id="typologies" className="bg-cream-dark px-6 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <p className="font-body text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-6 text-center">
            Typologies & pricing
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground leading-[1.15] mb-16 text-center">
            Two and three-bedroom apartments, from {fmtEur(MIN_PRICE)}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* T2 */}
            <article className="bg-background border border-border p-10 md:p-12 flex flex-col">
              <header className="mb-8 pb-8 border-b border-border">
                <p className="font-body text-[10px] tracking-[0.35em] uppercase text-gold mb-3">
                  2-Bedroom
                </p>
                <h3 className="font-heading text-3xl md:text-4xl text-foreground">T2 Apartments</h3>
              </header>
              <ul className="space-y-5 font-body text-sm text-foreground/85 mb-10 flex-1">
                <li className="flex items-start gap-4">
                  <Home size={16} strokeWidth={1.5} className="mt-1 text-gold" aria-hidden="true" />
                  <span>
                    Floor area from <strong>{t2Min} m²</strong> to <strong>{t2Max} m²</strong>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <Euro size={16} strokeWidth={1.5} className="mt-1 text-gold" aria-hidden="true" />
                  <span>
                    From <strong>{fmtEur(t2PriceMin)}</strong> to <strong>{fmtEur(t2PriceMax)}</strong>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <Car size={16} strokeWidth={1.5} className="mt-1 text-gold" aria-hidden="true" />
                  <span>2 private parking spaces included</span>
                </li>
                <li className="flex items-start gap-4">
                  <Compass size={16} strokeWidth={1.5} className="mt-1 text-gold" aria-hidden="true" />
                  <span>South/East or North/West orientation across two buildings</span>
                </li>
              </ul>
              <Link
                to="/#availability"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-foreground/20 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                See available T2 units
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </article>

            {/* T3 */}
            <article className="bg-background border border-border p-10 md:p-12 flex flex-col">
              <header className="mb-8 pb-8 border-b border-border">
                <p className="font-body text-[10px] tracking-[0.35em] uppercase text-gold mb-3">
                  3-Bedroom Penthouse
                </p>
                <h3 className="font-heading text-3xl md:text-4xl text-foreground">T3 Apartment</h3>
              </header>
              <ul className="space-y-5 font-body text-sm text-foreground/85 mb-10 flex-1">
                <li className="flex items-start gap-4">
                  <Home size={16} strokeWidth={1.5} className="mt-1 text-gold" aria-hidden="true" />
                  <span>
                    Floor area <strong>{t3Min} m²</strong>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <Euro size={16} strokeWidth={1.5} className="mt-1 text-gold" aria-hidden="true" />
                  <span>
                    From <strong>{fmtEur(t3PriceMin)}</strong>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <Car size={16} strokeWidth={1.5} className="mt-1 text-gold" aria-hidden="true" />
                  <span>2 private parking spaces included</span>
                </li>
                <li className="flex items-start gap-4">
                  <Compass size={16} strokeWidth={1.5} className="mt-1 text-gold" aria-hidden="true" />
                  <span>Triple-aspect top floor: South / West / North</span>
                </li>
              </ul>
              <Link
                to="/#availability"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-foreground/20 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                See T3 unit
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </article>
          </div>

          <p className="font-body text-xs text-muted-foreground text-center mt-12 max-w-2xl mx-auto leading-relaxed">
            Indicative pricing based on €{PRICE_PER_SQM}/m². Final value per unit depends on floor,
            orientation and selected finishes. All apartments include 2 parking spaces and a
            private storage unit.
          </p>
        </div>
      </section>

      {/* Why Silver Coast */}
      <section className="px-6 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <img
            src={interiorImage}
            alt="Interior of a contemporary new build apartment at Elocuente"
            className="w-full h-[480px] object-cover"
            width={900}
            height={600}
            loading="lazy"
          />
          <div>
            <p className="font-body text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-6">
              Why the Silver Coast
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground leading-[1.15] mb-8">
              Ocean, pine forest and a real Portuguese city, all within reach
            </h2>
            <ul className="space-y-5 font-body text-foreground/85 leading-[1.8] text-sm md:text-base">
              <li className="flex gap-4">
                <MapPin size={18} strokeWidth={1.5} className="text-gold mt-1 shrink-0" aria-hidden="true" />
                <span>
                  <strong>Leiria</strong> — historic castle city with hospitals, schools and an
                  international community, a short drive away.
                </span>
              </li>
              <li className="flex gap-4">
                <MapPin size={18} strokeWidth={1.5} className="text-gold mt-1 shrink-0" aria-hidden="true" />
                <span>
                  <strong>São Pedro de Moel & Praia da Vieira</strong> — long Atlantic beaches
                  and the protected Pinhal de Leiria pine forest within ten minutes.
                </span>
              </li>
              <li className="flex gap-4">
                <MapPin size={18} strokeWidth={1.5} className="text-gold mt-1 shrink-0" aria-hidden="true" />
                <span>
                  <strong>Lisbon & Porto</strong> — connected by the A8 and A17 motorways;
                  both international airports are reachable for day travel.
                </span>
              </li>
              <li className="flex gap-4">
                <MapPin size={18} strokeWidth={1.5} className="text-gold mt-1 shrink-0" aria-hidden="true" />
                <span>
                  <strong>Tax-friendly relocation</strong> — Portugal's new IFICI regime
                  (replacing NHR) offers attractive conditions for qualifying professionals
                  moving to Portugal.
                </span>
              </li>
            </ul>
            <Link
              to="/guides/living-in-marinha-grande-leiria"
              className="inline-flex items-center gap-2 mt-10 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:text-gold transition-colors"
            >
              Read the full relocation guide
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="relative px-6 md:px-16 lg:px-24 py-24 md:py-32 overflow-hidden"
        style={{ backgroundImage: `url(${aerialImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-5xl text-primary-foreground leading-[1.15] mb-6">
            Plan a visit, or request the full brochure
          </h2>
          <p className="font-body text-primary-foreground/80 leading-[2] text-sm md:text-base mb-10">
            We work directly with international buyers — replies in English, viewings arranged
            around your travel dates, and full documentation in PT, EN or ES.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gold text-charcoal font-body text-[10px] tracking-[0.3em] uppercase hover:bg-primary-foreground transition-colors"
          >
            Request information
            <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default SilverCoastLanding;
