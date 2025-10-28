import ProductList from "@/components/shop/ProductList";

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-[var(--primary)]">
        Productos Destacados
      </h1>
      <ProductList />
    </section>
  );
}
