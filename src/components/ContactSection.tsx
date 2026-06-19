import { useState, FormEvent, useMemo } from "react";

import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";
import { z } from "zod";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import polaroid1 from "@/assets/render-garden.jpg";
import polaroid2 from "@/assets/interior-living.jpg";
import polaroid3 from "@/assets/render-front.jpg";

const TYPOLOGIES = ["T2", "T3"] as const;

const ContactSection = () => {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    salutation: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    gender: "",
    nationality: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    message: "",
  });
  const [typologies, setTypologies] = useState<string[]>([]);
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: 100 }, (_, i) => currentYear - 18 - i),
    [currentYear]
  );
  const months = useMemo(
    () => Array.from({ length: 12 }, (_, i) => i + 1),
    []
  );
  const daysInMonth = useMemo(() => {
    const y = parseInt(formData.birthYear) || 2000;
    const m = parseInt(formData.birthMonth) || 1;
    return new Date(y, m, 0).getDate();
  }, [formData.birthYear, formData.birthMonth]);
  const days = useMemo(
    () => Array.from({ length: daysInMonth }, (_, i) => i + 1),
    [daysInMonth]
  );

  const schema = z.object({
    fullName: z.string().trim().min(1).max(160),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().max(40).optional(),
    salutation: z.string().trim().max(40).optional(),
    gender: z.string().trim().max(40).optional(),
    nationality: z.string().trim().max(80).optional(),
    city: z.string().trim().max(80).optional(),
    country: z.string().trim().max(80).optional(),
    message: z.string().trim().max(1000).optional(),
  });

  const toggleTypology = (typ: string) => {
    setTypologies((prev) =>
      prev.includes(typ) ? prev.filter((x) => x !== typ) : [...prev, typ]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!accepted) {
      toast.error(t("contact.acceptRequired"));
      return;
    }
    const parsed = schema.safeParse(formData);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || t("contact.error"));
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_leads").insert({
        name: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        salutation: parsed.data.salutation || null,
        birth_year: formData.birthYear ? parseInt(formData.birthYear) : null,
        birth_month: formData.birthMonth ? parseInt(formData.birthMonth) : null,
        birth_day: formData.birthDay ? parseInt(formData.birthDay) : null,
        gender: parsed.data.gender || null,
        nationality: parsed.data.nationality || null,
        city: parsed.data.city || null,
        country: parsed.data.country || null,
        typology: typologies.length ? typologies.join(", ") : null,
        message: parsed.data.message || null,
      });
      if (error) throw error;

      toast.success(t("contact.success"));
      setFormData({
        fullName: "", salutation: "", birthYear: "", birthMonth: "", birthDay: "",
        gender: "", nationality: "", city: "", country: "",
        email: "", phone: "", message: "",
      });
      setTypologies([]);
      setAccepted(false);
    } catch (err) {
      console.error("Contact form submission error:", err);
      toast.error(t("contact.error") || "Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const monthLabel = (m: number) => {
    const locale = lang === "pt" ? "pt-PT" : lang === "es" ? "es-ES" : "en-US";
    return new Date(2000, m - 1, 1).toLocaleDateString(locale, { month: "long" });
  };

  const inputCls =
    "w-full px-0 py-5 bg-transparent border-b border-border font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors";
  const selectCls =
    "w-full px-0 py-5 bg-transparent border-b border-border font-body text-sm text-foreground focus:outline-none focus:border-foreground transition-colors appearance-none cursor-pointer";

  return (
    <section id="contacto" className="bg-cream-dark relative overflow-hidden">
      {/* Subtle grain background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative grid lg:grid-cols-[42%_58%] min-h-[80vh]">
        {/* LEFT — Polaroid collage */}
        <div className="flex items-center justify-center px-8 md:px-12 lg:px-16 py-20 lg:py-24">
          <AnimatedSection className="w-full max-w-md">
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-10">
              {t("contact.label")}
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05] mb-10">
              <span className="italic font-light text-gold">{t("contact.titleItalic")}</span>
              <br />
              {t("contact.titleRest")}
            </h2>

            <div className="relative h-[420px] md:h-[460px] mt-6">
              {/* Polaroid 1 */}
              <figure className="absolute top-0 left-2 w-[58%] bg-white p-3 pb-12 shadow-elegant rotate-[-5deg] hover:rotate-[-2deg] hover:-translate-y-1 transition-transform duration-500">
                <img src={polaroid1} alt="" className="w-full aspect-[4/5] object-cover" />
                <figcaption className="absolute bottom-3 left-0 right-0 text-center font-heading italic text-sm text-charcoal/70">
                  {t("contact.note1")}
                </figcaption>
              </figure>
              {/* Polaroid 2 */}
              <figure className="absolute top-16 right-0 w-[55%] bg-white p-3 pb-12 shadow-elegant rotate-[4deg] hover:rotate-[1deg] hover:-translate-y-1 transition-transform duration-500">
                <img src={polaroid2} alt="" className="w-full aspect-square object-cover" />
                <figcaption className="absolute bottom-3 left-0 right-0 text-center font-heading italic text-sm text-charcoal/70">
                  {t("contact.note2")}
                </figcaption>
              </figure>
              {/* Polaroid 3 */}
              <figure className="absolute bottom-0 left-10 w-[50%] bg-white p-3 pb-12 shadow-elegant rotate-[-2deg] hover:rotate-[0deg] hover:-translate-y-1 transition-transform duration-500">
                <img src={polaroid3} alt="" className="w-full aspect-[5/4] object-cover" />
                <figcaption className="absolute bottom-3 left-0 right-0 text-center font-heading italic text-sm text-charcoal/70">
                  {t("contact.note3")}
                </figcaption>
              </figure>
            </div>

            <p className="font-body text-muted-foreground leading-[2] text-sm mt-12 max-w-sm">
              {t("contact.desc")}
            </p>
          </AnimatedSection>
        </div>

        {/* RIGHT — Form card */}
        <div className="flex items-center px-8 md:px-12 lg:px-20 py-20 lg:py-24 bg-background">
          <AnimatedSection delay={0.15} className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-0" aria-label={t("contact.label")}>
              <input
                type="text"
                placeholder={t("contact.fullName")}
                aria-label={t("contact.fullName")}
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={inputCls}
              />

              <input
                type="text"
                placeholder={t("contact.salutation")}
                aria-label={t("contact.salutation")}
                value={formData.salutation}
                onChange={(e) => setFormData({ ...formData, salutation: e.target.value })}
                className={inputCls}
              />

              <div className="py-6 border-b border-border">
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
                  {t("contact.birthDate")}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <select
                    aria-label={t("contact.year")}
                    value={formData.birthYear}
                    onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                    className={selectCls + " py-3"}
                  >
                    <option value="">{t("contact.year")}</option>
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <select
                    aria-label={t("contact.month")}
                    value={formData.birthMonth}
                    onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                    className={selectCls + " py-3"}
                  >
                    <option value="">{t("contact.month")}</option>
                    {months.map((m) => (
                      <option key={m} value={m}>{monthLabel(m)}</option>
                    ))}
                  </select>
                  <select
                    aria-label={t("contact.day")}
                    value={formData.birthDay}
                    onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                    className={selectCls + " py-3"}
                  >
                    <option value="">{t("contact.day")}</option>
                    {days.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <input
                type="text"
                placeholder={t("contact.gender")}
                aria-label={t("contact.gender")}
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className={inputCls}
              />

              <input
                type="text"
                placeholder={t("contact.nationality")}
                aria-label={t("contact.nationality")}
                value={formData.nationality}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                className={inputCls}
              />

              <input
                type="text"
                placeholder={t("contact.city")}
                aria-label={t("contact.city")}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={inputCls}
              />

              <input
                type="text"
                placeholder={t("contact.country")}
                aria-label={t("contact.country")}
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className={inputCls}
              />

              <input
                type="email"
                placeholder={t("contact.email")}
                aria-label={t("contact.email")}
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputCls}
              />
              <input
                type="tel"
                placeholder={t("contact.phone")}
                aria-label={t("contact.phone")}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputCls}
              />

              <div className="py-6 border-b border-border" role="group" aria-label={t("contact.typology")}>
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
                  {t("contact.typology")}
                </p>
                <div className="flex gap-3 flex-wrap">
                  {TYPOLOGIES.map((typ) => {
                    const active = typologies.includes(typ);
                    return (
                      <button
                        key={typ}
                        type="button"
                        onClick={() => toggleTypology(typ)}
                        aria-pressed={active}
                        className={`px-5 py-2 font-body text-[11px] tracking-[0.2em] uppercase border transition-all ${
                          active
                            ? "bg-foreground text-background border-foreground"
                            : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
                        }`}
                      >
                        {typ}
                      </button>
                    );
                  })}
                </div>
              </div>

              <textarea
                placeholder={t("contact.message")}
                aria-label={t("contact.message")}
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={inputCls + " resize-none"}
              />

              <label className="flex items-start gap-3 pt-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-gold flex-shrink-0"
                />
                <span className="font-body text-xs text-muted-foreground leading-relaxed">
                  {t("contact.acceptTerms")}{" "}
                  <a href="/privacidade" className="text-foreground underline underline-offset-2 hover:text-gold">
                    {t("contact.privacyLink")}
                  </a>
                  .
                </span>
              </label>

              <div className="pt-10">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 bg-gold text-charcoal font-body text-[11px] font-medium tracking-[0.3em] uppercase hover:bg-gold/90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_8px_24px_-8px_hsl(var(--gold)/0.6)]"
                >
                  {submitting ? "..." : t("contact.submit")}
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
