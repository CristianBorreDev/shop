import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-neutral-800 bg-[var(--accent)]">
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center text-sm text-neutral-400">
        <p>© {new Date().getFullYear()} Cristian / Zentrix. Todos los derechos reservados.</p>
        <p>Hecho con {<Heart />} usando Next.js + Tailwind</p>
      </div>
    </footer>
  );
}
