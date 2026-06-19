import Reveal from "./motion/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteImage } from "@/hooks/useSiteImages";

const PromoterSection = () => {
  const { t } = useLanguage();
  const photo = useSiteImage("promoter.photo", "");

  return (
    <section id="promotor" className="bg-background">
      <div className="grid lg:grid-cols-2">
        <Reveal
          variant="mask-reveal"
          duration={1.1}
          className="relative lg:min-h-[600px] overflow-hidden"
        >
          {photo ? (
            <img
              src={photo}
              alt="Fotografia do promotor do Elocuente"
              className="w-full h-full object-cover aspect-[3/4] lg:aspect-auto"
              loading="lazy"
            />
          ) : (
            <div className="aspect-[3/4] lg:aspect-auto lg:h-full w-full bg-muted flex items-center justify-center">
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                {t("promoter.photo")}
              </span>
            </div>
          )}
        </Reveal>

        <div className="flex items-center px-8 lg:px-20 py-20 md:py-28 bg-cream-dark">
          <Reveal variant="slide-right" delay={0.1}>
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-8">
              {t("promoter.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground leading-[1.15] mb-12">
              {t("promoter.title")}
            </h2>
            <div className="max-w-lg space-y-6">
              {t("promoter.text")
                .split("\n\n")
                .map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-body text-sm md:text-base text-muted-foreground leading-[1.9] whitespace-pre-line"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default PromoterSection;
