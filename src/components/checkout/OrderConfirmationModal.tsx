import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function OrderConfirmationModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-neutral-900 rounded-2xl p-8 flex flex-col items-center gap-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <motion.div
          className="p-4 bg-[var(--primary)] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: 1 }}
        >
          <Check size={32} className="text-black" />
        </motion.div>
        <h2 className="text-2xl font-semibold text-white">¡Pedido confirmado!</h2>
        <p className="text-neutral-400">Tu pedido ha sido empacado y enviado.</p>
        <p className="text-neutral-400">Redirigiendo a la tienda...</p>
      </motion.div>
    </motion.div>
  );
}
