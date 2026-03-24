import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    typology: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Obrigado pelo seu interesse! Entraremos em contacto brevemente.");
    setFormData({ name: "", email: "", phone: "", typology: "", message: "" });
  };

  return (
    <section id="contacto" className="py-28 md:py-40 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <AnimatedSection>
            <p className="text-gold font-body text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6">
              Contacto
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground leading-[1.1] mb-8">
              Manifeste o seu interesse
            </h2>
            <p className="font-body text-muted-foreground leading-[1.8] text-sm md:text-base mb-14">
              Preencha o formulário e a nossa equipa comercial entrará em contacto
              consigo para mais informações sobre o Monte Grande Residences.
            </p>

            <div className="space-y-6">
              {[
                { icon: Phone, text: "+351 916 422 521" },
                { icon: Mail, text: "info@montegrande-residences.pt" },
                { icon: MapPin, text: "Rua do Fagundo, Monte Grande" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4">
                  <item.icon className="w-4 h-4 text-gold stroke-[1.5]" />
                  <span className="font-body text-sm text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-8">
              {[
                { name: "name" as const, placeholder: "Nome completo", type: "text" },
                { name: "email" as const, placeholder: "Email", type: "email" },
                { name: "phone" as const, placeholder: "Telefone", type: "tel" },
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
                  className="w-full px-0 py-4 bg-transparent border-b border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors duration-300"
                />
              ))}

              <select
                value={formData.typology}
                onChange={(e) =>
                  setFormData({ ...formData, typology: e.target.value })
                }
                required
                className="w-full px-0 py-4 bg-transparent border-b border-border font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors duration-300 appearance-none"
              >
                <option value="" disabled>
                  Tipologia de interesse
                </option>
                <option value="T1">T1</option>
                <option value="T2">T2</option>
                <option value="T3">T3</option>
              </select>

              <textarea
                placeholder="Mensagem (opcional)"
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-0 py-4 bg-transparent border-b border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
              />

              <button
                type="submit"
                className="w-full py-4 bg-foreground text-background font-body text-xs tracking-[0.3em] uppercase hover:bg-gold transition-colors duration-500"
              >
                Enviar Pedido
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
