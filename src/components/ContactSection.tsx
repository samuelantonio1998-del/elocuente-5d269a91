import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    typology: "",
    message: "",
  });
  const { t } = useLanguage();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success(t("contact.success"));
    setFormData({ name: "", email: "", phone: "", typology: "", message: "" });
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
              {[
                { name: "name" as const, placeholder: t("contact.name"), type: "text" },
                { name: "email" as const, placeholder: t("contact.email"), type: "email" },
                { name: "phone" as const, placeholder: t("contact.phone"), type: "tel" },
              ].map((field) => (
                <input
                  key={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  value={formData[field.name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  className="w-full px-0 py-5 bg-transparent border-b border-border font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors duration-300"
                />
              ))}

              <select
                value={formData.typology}
                onChange={(e) =>
                  setFormData({ ...formData, typology: e.target.value })
                }
                required
                className="w-full px-0 py-5 bg-transparent border-b border-border font-body text-sm text-foreground focus:outline-none focus:border-foreground transition-colors duration-300 appearance-none"
              >
                <option value="" disabled>
                  {t("contact.typology")}
                </option>
                <option value="T2">T2</option>
                <option value="T3">T3</option>
              </select>

              <textarea
                placeholder={t("contact.message")}
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-0 py-5 bg-transparent border-b border-border font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
              />

              <div className="pt-10">
                <button
                  type="submit"
                  className="w-full py-4 bg-foreground text-background font-body text-[10px] tracking-[0.3em] uppercase hover:bg-gold hover:text-background transition-all duration-500"
                >
                  {t("contact.submit")}
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
