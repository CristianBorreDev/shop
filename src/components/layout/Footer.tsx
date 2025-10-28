import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-neutral-800 bg-[var(--accent)]">
      <div className="max-w-6xl mx-auto py-4 flex justify-center items-center text-sm text-neutral-400">
        <p>© {new Date().getFullYear()} Cristian / Zentrix. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
