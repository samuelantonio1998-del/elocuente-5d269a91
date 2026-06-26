import Reveal from "./motion/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteImage } from "@/hooks/useSiteImages";

const PromoterSection = () => {
  const { t } = useLanguage();
  const photo = useSiteImage("promoter.photo", "");

  return (
    <section id="promotor" className="bg-cream-dark">
      <div className="section-py px-6 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <Reveal
            variant="mask-reveal"
            duration={1.1}
            className="w-[70%] sm:w-[45%] lg:w-[30%] mb-16 md:mb-24"
          >
            {photo.src && photo.isResolved ? (
              <img
                key={photo.renderKey}
                src={photo.src}
                alt="Fotografia do promotor do Elocuente"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
              />
            ) : (
              <div className="aspect-[3/4] w-full bg-muted flex items-center justify-center">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  {t("promoter.photo")}
                </span>
              </div>
            )}
          </Reveal>

          <Reveal variant="fade-up" delay={0.1} className="w-full max-w-2xl text-center">
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-10 md:mb-14">
              {t("promoter.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground leading-[1.15] mb-12 md:mb-16">
              {t("promoter.title")}
            </h2>
            <div className="space-y-6 text-left">
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
