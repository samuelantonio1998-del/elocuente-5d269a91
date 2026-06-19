import { useEffect, useRef, useState } from "react";
import Reveal from "./motion/Reveal";
import render1 from "@/assets/render-1.png.asset.json";
import render2 from "@/assets/render-2.png.asset.json";
import render3 from "@/assets/render-3.png.asset.json";
import { useLanguage } from "@/i18n/LanguageContext";

const renders = [render1.url, render2.url, render3.url];

const AboutSection = () => {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  const blocks = [
    { sub: t("about.sub1"), p: t("about.p1") },
    { sub: t("about.sub2"), p: t("about.p2") },
    { sub: t("about.sub3"), p: t("about.p3") },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setActiveIdx(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    blockRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sobre" className="bg-background">
      <div className="grid lg:grid-cols-2">
        {/* Image column — sticky on desktop */}
        <div className="relative h-[50vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden">
          {renders.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Render exterior do empreendimento Elocuente em Marinha Grande"
              width={1600}
              height={1200}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
                i === activeIdx ? "opacity-100" : "opacity-0"
              }`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>

        {/* Text column — one block per viewport */}
        <div className="bg-cream-dark">
          <div className="px-8 lg:px-20 pt-20 md:pt-28">
            <Reveal variant="slide-right" delay={0.1}>
              <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-8">
                {t("about.label")}
              </p>
              <h2 className="font-heading text-3xl md:text-5xl text-foreground leading-[1.15]">
                {t("about.title")}
              </h2>
            </Reveal>
          </div>

          {blocks.map((b, i) => (
            <div
              key={i}
              ref={(el) => (blockRefs.current[i] = el)}
              data-idx={i}
              className="px-8 lg:px-20 min-h-[80vh] lg:min-h-screen flex items-center"
            >
              <Reveal variant="slide-right" delay={0.1}>
                <p className="font-body text-sm md:text-base text-foreground leading-[1.9] max-w-lg">
                  <strong className="font-semibold text-foreground">{b.sub}</strong>{" "}
                  <span className="text-muted-foreground">{b.p}</span>
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
