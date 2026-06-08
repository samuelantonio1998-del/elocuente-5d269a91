import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import heroImage from "@/assets/render-aerial.jpg";
import { GUIDES, type GuideLocale } from "@/data/guideContent";
import { useLanguage } from "@/i18n/LanguageContext";

const SITE_URL = "https://elocuente.lovable.app";

interface Props {
  locale: GuideLocale;
}

const GuidePage = ({ locale }: Props) => {
  const guide = GUIDES[locale];
  const { setLang } = useLanguage();

  // Force the language context to match the route locale.
  useEffect(() => {
    setLang(locale);
    document.documentElement.lang = guide.htmlLang;
  }, [locale, guide.htmlLang, setLang]);

  // Scroll to top on mount so the hero is always visible first.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [locale]);

  const url = `${SITE_URL}${guide.path}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.heroTitle,
    description: guide.metaDescription,
    inLanguage: guide.htmlLang,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: { "@type": "Organization", name: "Elocuente" },
    publisher: {
      "@type": "Organization",
      name: "Elocuente",
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${SITE_URL}/og-home.jpg`,
  };

  return (
    <main className="bg-background">
      <Helmet>
        <html lang={guide.htmlLang} />
        <title>{guide.metaTitle}</title>
        <meta name="description" content={guide.metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={guide.metaTitle} />
        <meta property="og:description" content={guide.metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE_URL}/og-home.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={guide.metaTitle} />
        <meta name="twitter:description" content={guide.metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}/og-home.jpg`} />
        {/* hreflang siblings */}
        {Object.values(GUIDES).map((g) => (
          <link key={g.locale} rel="alternate" hrefLang={g.htmlLang} href={`${SITE_URL}${g.path}`} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${GUIDES.en.path}`} />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
      </Helmet>

      {/* Hero */}
      <header className="relative h-[75vh] min-h-[520px] w-full overflow-hidden">
        <img
          src={heroImage}
          alt={guide.heroTitle}
          className="absolute inset-0 w-full h-full object-cover scale-105"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="relative z-10 flex flex-col items-start justify-end h-full text-left px-6 md:px-16 lg:px-24 pb-16 md:pb-24 max-w-5xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body text-[10px] tracking-[0.3em] uppercase text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />
            {guide.backLabel}
          </Link>
          <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-gold mb-6">
            {guide.heroEyebrow}
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05] max-w-4xl">
            {guide.heroTitle}
          </h1>
          <p className="font-body font-light text-base md:text-xl text-primary-foreground/80 mt-8 max-w-2xl leading-relaxed">
            {guide.heroLead}
          </p>
        </div>
      </header>

      {/* Article body */}
      <article className="px-6 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="max-w-3xl mx-auto space-y-20">
          {guide.sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2
                id={section.id}
                className="font-heading text-2xl md:text-4xl text-foreground leading-[1.2] mb-8"
              >
                {section.title}
              </h2>
              <div className="space-y-5 font-body text-foreground/85 leading-[1.9] text-base">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          {/* Sources */}
          <section aria-labelledby="sources" className="pt-10 border-t border-border">
            <h2
              id="sources"
              className="font-body text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-6"
            >
              {guide.sourcesLabel}
            </h2>
            <ul className="space-y-2 font-body text-sm text-muted-foreground">
              {guide.sources.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors underline underline-offset-4 decoration-border"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      {/* Final CTA */}
      <section className="bg-cream-dark px-6 md:px-16 lg:px-24 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-5xl text-foreground leading-[1.15] mb-6">
            {guide.ctaTitle}
          </h2>
          <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base mb-10 max-w-xl mx-auto">
            {guide.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={guide.ctaPrimaryHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-body text-[10px] tracking-[0.3em] uppercase hover:bg-gold transition-colors"
            >
              {guide.ctaPrimary}
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
            <Link
              to={guide.ctaSecondaryHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-foreground/20 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              {guide.ctaSecondary}
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GuidePage;
