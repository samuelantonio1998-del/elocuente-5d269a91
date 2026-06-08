import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageContext";
import paymentTermsPdf from "@/assets/condicoes-pagamento.pdf.asset.json";
import { Download } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Lang = "pt" | "en" | "es";

const content: Record<Lang, {
  title: string;
  intro: string;
  rows: { value: string; label: string; desc?: string }[];
  schedule: string;
  noteTitle: string;
  noteBody: string;
  download: string;
  disclaimer: string;
}> = {
  pt: {
    title: "Condições de Pagamento",
    intro: "Plano de pagamento para aquisição de fração no empreendimento Elocuente.",
    rows: [
      { value: "5.000 €", label: "Reserva", desc: "Garante o interesse na fração escolhida, sem compromisso contratual." },
      { value: "10%", label: "Com a assinatura do Contrato de Promessa de Compra e Venda (CPCV)." },
      { value: "10%", label: "Seis meses após o CPCV, verificado o início dos trabalhos de construção." },
      { value: "10%", label: "Doze meses após a assinatura do CPCV." },
      { value: "70%", label: "Na celebração da Escritura de Compra e Venda." },
    ],
    schedule: "A celebração das escrituras terá início até seis meses após a conclusão da construção.",
    noteTitle: "Nota sobre a reserva",
    noteBody:
      "A reserva garante o seu interesse na fração, sem compromisso contratual para qualquer das partes. Caso decida não avançar, ou se o CPCV não for assinado no prazo acordado, o valor é integralmente devolvido no prazo de 15 dias, por transferência para a conta de origem dos fundos.",
    download: "Descarregar PDF",
    disclaimer: "Documento informativo, sem caráter contratual. Valores e prazos sujeitos a confirmação.",
  },
  en: {
    title: "Payment Terms",
    intro: "Payment plan for purchasing a unit at the Elocuente development.",
    rows: [
      { value: "€5,000", label: "Reservation", desc: "Secures your interest in the chosen unit, with no contractual commitment." },
      { value: "10%", label: "Upon signing the Promissory Purchase and Sale Agreement (CPCV)." },
      { value: "10%", label: "Six months after the CPCV, once construction works have started." },
      { value: "10%", label: "Twelve months after signing the CPCV." },
      { value: "70%", label: "Upon signing the Public Deed of Sale." },
    ],
    schedule: "Public deeds will be signed within six months of construction completion.",
    noteTitle: "About the reservation",
    noteBody:
      "The reservation secures your interest in the unit with no contractual commitment from either party. If you decide not to proceed, or if the CPCV is not signed within the agreed period, the amount is fully refunded within 15 days by transfer to the source account.",
    download: "Download PDF",
    disclaimer: "Informational document, non-contractual. Values and timelines subject to confirmation.",
  },
  es: {
    title: "Condiciones de Pago",
    intro: "Plan de pago para la adquisición de una fracción en la promoción Elocuente.",
    rows: [
      { value: "5.000 €", label: "Reserva", desc: "Garantiza su interés en la fracción elegida, sin compromiso contractual." },
      { value: "10%", label: "Con la firma del Contrato de Promesa de Compraventa (CPCV)." },
      { value: "10%", label: "Seis meses después del CPCV, comprobado el inicio de las obras." },
      { value: "10%", label: "Doce meses después de la firma del CPCV." },
      { value: "70%", label: "En la firma de la Escritura de Compraventa." },
    ],
    schedule: "Las escrituras se firmarán en un plazo de hasta seis meses tras la finalización de la obra.",
    noteTitle: "Nota sobre la reserva",
    noteBody:
      "La reserva garantiza su interés en la fracción, sin compromiso contractual para ninguna de las partes. Si decide no avanzar, o si el CPCV no se firma en el plazo acordado, el importe se devuelve íntegramente en 15 días, por transferencia a la cuenta de origen de los fondos.",
    download: "Descargar PDF",
    disclaimer: "Documento informativo, sin carácter contractual. Valores y plazos sujetos a confirmación.",
  },
};

const PaymentTermsDialog = ({ open, onOpenChange }: Props) => {
  const { lang } = useLanguage();
  const c = content[(lang as Lang) in content ? (lang as Lang) : "pt"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader className="text-left space-y-3 pb-2">
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-gold">Elocuente</p>
          <DialogTitle className="font-heading text-2xl md:text-3xl text-foreground leading-tight">
            {c.title}
          </DialogTitle>
          <DialogDescription className="font-body text-sm text-muted-foreground leading-relaxed">
            {c.intro}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 divide-y divide-border border-y border-border">
          {c.rows.map((row, i) => (
            <div key={i} className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-4 py-4">
              <div className="font-heading text-lg md:text-xl text-gold">{row.value}</div>
              <div className="font-body text-sm text-foreground/85 leading-relaxed">
                <p>{row.label}</p>
                {row.desc && <p className="text-muted-foreground text-xs mt-1.5">{row.desc}</p>}
              </div>
            </div>
          ))}
        </div>

        <p className="font-body text-xs text-muted-foreground italic mt-4 leading-relaxed">
          {c.schedule}
        </p>

        <div className="mt-6 p-5 bg-cream-dark border border-border">
          <p className="font-body text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-3">
            {c.noteTitle}
          </p>
          <p className="font-body text-xs text-foreground/80 leading-[1.8]">{c.noteBody}</p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-5 border-t border-border">
          <p className="font-body text-[10px] text-muted-foreground leading-relaxed">
            {c.disclaimer}
          </p>
          <a
            href={paymentTermsPdf.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-foreground text-background font-body text-[10px] tracking-[0.3em] uppercase hover:bg-gold transition-colors shrink-0"
          >
            <Download size={14} strokeWidth={1.5} aria-hidden="true" />
            {c.download}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentTermsDialog;
