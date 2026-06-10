import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const PHONE = "351914383708";

const WhatsAppFAB = () => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(t("whatsapp.message"))}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp.aria")}
      title={t("whatsapp.aria")}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.9 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduce ? undefined : { scale: 1.06 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-black/20 ring-1 ring-black/5 transition-shadow hover:shadow-xl md:h-[60px] md:w-[60px]"
      style={{ backgroundColor: "#25D366" }}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 md:h-8 md:w-8"
        fill="white"
        aria-hidden="true"
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.328 1.962.747 2.83 1.117 2.222 2.695 4.255 4.717 5.732 1.16.832 3.222 2.05 4.626 2.05.745 0 2.295-.802 2.295-1.748 0-.531-.4-.96-.917-1.13-.314-.115-.945-.502-1.16-.502z"/>
        <path d="M16.05 4C9.394 4 4 9.394 4 16.05c0 2.252.628 4.428 1.82 6.31L4 28l5.79-1.81a12.04 12.04 0 0 0 6.26 1.74h.005C22.71 27.93 28.1 22.535 28.1 15.88c0-3.207-1.246-6.222-3.51-8.488A11.97 11.97 0 0 0 16.05 4zm0 21.99h-.004a10 10 0 0 1-5.092-1.395l-.366-.217-3.785 1.184 1.205-3.692-.238-.379a9.96 9.96 0 0 1-1.528-5.314c0-5.519 4.49-10.01 10.01-10.01 2.673 0 5.186 1.041 7.075 2.931a9.945 9.945 0 0 1 2.93 7.082c-.002 5.52-4.492 10.01-10.207 10.01z"/>
      </svg>
    </motion.a>
  );
};

export default WhatsAppFAB;
