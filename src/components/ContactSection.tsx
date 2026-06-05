import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";
import { z } from "zod";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const TYPOLOGIES = ["T2", "T3"] as const;

const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [typologies, setTypologies] = useState<string[]>([]);
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const schema = z.object({
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().max(40).optional(),
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
        name: `${parsed.data.firstName} ${parsed.data.lastName}`.trim(),
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        typology: typologies.length ? typologies.join(", ") : null,
        message: parsed.data.message || null,
      });
      if (error) throw error;

      toast.success(t("contact.success"));
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      setTypologies([]);
      setAccepted(false);
    } catch (err) {
      console.error("Contact form submission error:", err);
      toast.error(t("contact.error") || "Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="bg-background">
      <div className="grid lg:grid-cols-2 min-h-[80vh]">
        <div className="flex items-center px-8 lg:px-20 py-20 lg:py-0 bg-cream-dark">
          <AnimatedSection>
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-10">
              {t("contact.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground leading-[1.15] mb-8">
              {t("contact.title1")}<br />{t("contact.title2")}
            </h2>
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base mb-16 max-w-md">
              {t("contact.desc")}
            </p>

            <div className="space-y-8">
              {[
                { icon: Phone, text: "+351 916 422 521" },
                { icon: Mail, text: "info@elocuente.pt" },
                { icon: MapPin, text: "Rua do Fagundo, Albergaria\nMarinha Grande" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-4">
                  <item.icon className="w-4 h-4 text-gold flex-shrink-0 mt-0.5 stroke-[1.5]" />
                  <span className="font-body text-sm text-foreground whitespace-pre-line">{item.text}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <div className="flex items-center px-8 lg:px-20 py-20 lg:py-0">
          <AnimatedSection delay={0.15} className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-0">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t("contact.firstName")}
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-0 py-5 bg-transparent border-b border-border font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
                />
                <input
                  type="text"
                  placeholder={t("contact.lastName")}
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-0 py-5 bg-transparent border-b border-border font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <input
                type="email"
                placeholder={t("contact.email")}
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-0 py-5 bg-transparent border-b border-border font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
              />
              <input
                type="tel"
                placeholder={t("contact.phone")}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-0 py-5 bg-transparent border-b border-border font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
              />

              <div className="py-6 border-b border-border">
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
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-0 py-5 bg-transparent border-b border-border font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors resize-none"
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
                  className="w-full py-4 bg-foreground text-background font-body text-[10px] tracking-[0.3em] uppercase hover:bg-gold hover:text-background transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
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
