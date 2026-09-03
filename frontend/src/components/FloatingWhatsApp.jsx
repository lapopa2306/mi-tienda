import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappShareLink } from "@/data/site";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappShareLink("Hola Off Course! Quiero hacer una consulta.")}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-whatsapp-button"
      aria-label="Consultar por WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-colors duration-300 hover:bg-[#1ebe57] sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/50" />
      <MessageCircle size={26} strokeWidth={2} />
    </motion.a>
  );
}

