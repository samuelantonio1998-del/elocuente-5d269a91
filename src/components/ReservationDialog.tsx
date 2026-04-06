import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageContext";
import { useCurrency } from "@/hooks/useCurrency";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Unit {
  id: string;
  building: string;
  floor: number;
  type: string;
  area: string;
  parking: number;
  orientation: string;
  price: number;
}

interface ReservationDialogProps {
  unit: Unit | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RESERVATION_FEE = 5000;

const ReservationDialog = ({ unit, open, onOpenChange }: ReservationDialogProps) => {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
    phone: "",
    country: "",
    nif: "",
    iban: "",
    bank_entity: "",
    terms_accepted: false,
    privacy_accepted: false,
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const floorLabel = (f: number) => (f === 0 ? t("availability.groundFloor") : `${f}º`);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unit || !form.terms_accepted || !form.privacy_accepted) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from("reservations").insert({
        unit_id: unit.id,
        building: unit.building,
        floor: unit.floor,
        typology: unit.type,
        area: unit.area,
        orientation: unit.orientation,
        parking: unit.parking,
        price: unit.price,
        first_name: form.first_name,
        last_name: form.last_name,
        company_name: form.company_name || null,
        email: form.email,
        phone: form.phone,
        country: form.country || null,
        nif: form.nif || null,
        iban: form.iban || null,
        bank_entity: form.bank_entity || null,
        terms_accepted: form.terms_accepted,
        privacy_accepted: form.privacy_accepted,
      });

      if (error) throw error;

      toast({
        title: t("reservation.success.title"),
        description: t("reservation.success.desc"),
      });
      onOpenChange(false);
      setForm({
        first_name: "", last_name: "", company_name: "", email: "", phone: "",
        country: "", nif: "", iban: "", bank_entity: "",
        terms_accepted: false, privacy_accepted: false,
      });
    } catch {
      toast({
        title: t("reservation.error.title"),
        description: t("reservation.error.desc"),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!unit) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border-border w-[95vw] md:w-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Summary - shown first on mobile */}
          <div className="bg-muted/30 p-6 md:p-10 border-b lg:border-b-0 lg:border-l border-border order-first lg:order-last">
            <div className="lg:sticky lg:top-8">
              <h3 className="font-heading text-xl text-gold mb-6">
                {t("reservation.summary")}
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-0">
                <SummaryRow label={t("reservation.summaryProject")} value="Elocuente" />
                <SummaryRow label={t("reservation.summaryTypology")} value={unit.type} />
                <SummaryRow label={t("reservation.summaryRef")} value={unit.id} />
                <SummaryRow label={t("reservation.summaryLocation")} value="Albergaria" />
                <SummaryRow label={t("reservation.summaryFloor")} value={floorLabel(unit.floor)} />
                <SummaryRow label={t("reservation.summaryArea")} value={unit.area} />
                <SummaryRow label={t("reservation.summaryParking")} value={String(unit.parking)} />
                <SummaryRow label={t("reservation.summaryOrientation")} value={unit.orientation} />
                <SummaryRow label={t("reservation.summaryPrice")} value={formatPrice(unit.price)} />
              </div>

              <div className="mt-6 bg-gold text-background p-4 md:p-5 flex items-center justify-between">
                <span className="font-body text-[10px] md:text-[11px] tracking-[0.15em] uppercase">
                  {t("reservation.toPay")}
                </span>
                <span className="font-heading text-xl md:text-2xl">
                  {formatPrice(RESERVATION_FEE)}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 p-6 md:p-12 order-last lg:order-first">
            <DialogTitle className="font-heading text-2xl md:text-3xl text-foreground mb-1">
              {t("reservation.title")}
            </DialogTitle>
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-8">
              Elocuente | {unit.type} | Ref {unit.id} | {floorLabel(unit.floor)}
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal data */}
              <div>
                <h3 className="font-body text-sm font-medium text-foreground mb-6 border-b border-border pb-3">
                  {t("reservation.personalData")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label={t("reservation.firstName")} value={form.first_name} onChange={(v) => update("first_name", v)} required />
                  <InputField label={t("reservation.lastName")} value={form.last_name} onChange={(v) => update("last_name", v)} required />
                </div>
                <div className="mt-6">
                  <InputField label={t("reservation.company")} value={form.company_name} onChange={(v) => update("company_name", v)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <InputField label={t("reservation.email")} value={form.email} onChange={(v) => update("email", v)} type="email" required />
                  <InputField label={t("reservation.phone")} value={form.phone} onChange={(v) => update("phone", v)} type="tel" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <InputField label={t("reservation.country")} value={form.country} onChange={(v) => update("country", v)} />
                  <InputField label={t("reservation.nif")} value={form.nif} onChange={(v) => update("nif", v)} />
                </div>
              </div>

              {/* Bank details */}
              <div>
                <h3 className="font-body text-sm font-medium text-foreground mb-6 border-b border-border pb-3">
                  {t("reservation.bankDetails")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="IBAN" value={form.iban} onChange={(v) => update("iban", v)} />
                  <InputField label={t("reservation.bankEntity")} value={form.bank_entity} onChange={(v) => update("bank_entity", v)} />
                </div>
                <p className="font-body text-[10px] text-muted-foreground mt-3 italic leading-relaxed">
                  {t("reservation.bankNote")}
                </p>
              </div>

              {/* Terms */}
              <div className="space-y-4">
                <h3 className="font-body text-sm font-medium text-foreground mb-4 border-b border-border pb-3">
                  {t("reservation.terms")}
                </h3>
                <div className="font-body text-xs text-muted-foreground leading-relaxed space-y-3 mb-6">
                  <p className="font-medium text-foreground">{t("reservation.termsTitle")}</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t("reservation.terms1")}</li>
                    <li>{t("reservation.terms2")}</li>
                    <li>{t("reservation.terms3")}</li>
                    <li>{t("reservation.terms4")}</li>
                    <li>{t("reservation.terms5")}</li>
                  </ul>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.terms_accepted}
                    onChange={(e) => update("terms_accepted", e.target.checked)}
                    className="mt-1 accent-foreground min-w-[16px]"
                    required
                  />
                  <span className="font-body text-xs text-muted-foreground leading-relaxed">
                    {t("reservation.acceptTerms")}
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.privacy_accepted}
                    onChange={(e) => update("privacy_accepted", e.target.checked)}
                    className="mt-1 accent-foreground min-w-[16px]"
                    required
                  />
                  <span className="font-body text-xs text-muted-foreground leading-relaxed">
                    {t("reservation.acceptPrivacy")}
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="font-body text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← {t("reservation.back")}
                </button>
                <button
                  type="submit"
                  disabled={submitting || !form.terms_accepted || !form.privacy_accepted}
                  className="w-full sm:w-auto px-8 py-3.5 bg-foreground text-background font-body text-[10px] tracking-[0.3em] uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "..." : t("reservation.submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InputField = ({
  label, value, onChange, type = "text", required = false,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) => (
  <div className="relative">
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      placeholder=" "
      className="w-full px-0 py-3 bg-transparent border-b border-border font-body text-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors peer placeholder-transparent"
    />
    <label className="absolute left-0 top-3 font-body text-xs text-muted-foreground transition-all peer-focus:-top-2 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
      {label}
    </label>
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-baseline py-2 border-b border-border/50">
    <span className="font-body text-xs text-muted-foreground">{label}</span>
    <span className="font-body text-sm text-foreground font-medium">{value}</span>
  </div>
);

export default ReservationDialog;
