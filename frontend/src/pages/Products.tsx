import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tag, Package, Printer, Star } from "lucide-react";
import labelsCloseup from "@/assets/labels-closeup.jpg";
import packagingProduction from "@/assets/packaging-production.jpg";
import stickersTapes from "@/assets/stickers-tapes.jpg";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5069";

interface Product {
  _id: string;
  name: string;
  desc: string;
  useCases: string;
  category: string;
  image?: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const categories = [
    {
      title: "Tags & Labels",
      icon: Tag,
      image: labelsCloseup,
      items: products.filter(p => p.category === "Tags & Labels")
    },
    {
      title: "Stickers & Printed Materials",
      icon: Printer,
      image: stickersTapes,
      items: products.filter(p => p.category === "Stickers & Printed Materials")
    },
    {
      title: "Packaging Solutions",
      icon: Package,
      image: packagingProduction,
      items: products.filter(p => p.category === "Packaging Solutions")
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img src={packagingProduction} alt="Products" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40">
          <div className="gold-accent-line" />
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-primary-foreground tracking-editorial mb-4">
            Our <span className="text-accent">Products</span>
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl text-balance">
            Comprehensive range of tags, labels, packaging & printing solutions for global brands.
          </p>
        </div>
      </section>

      {/* Categories */}
      {loading ? (
        <div className="py-20 text-center font-heading text-xl text-muted-foreground animate-pulse">
          Loading high-fidelity products...
        </div>
      ) : (
        categories.map((cat, catIdx) => (
          cat.items.length > 0 && (
            <section key={cat.title} className={`section-padding ${catIdx % 2 === 0 ? 'bg-background' : 'bg-secondary'}`}>
              <div className="container mx-auto">
                <ScrollReveal>
                  <div className="flex items-center gap-4 mb-12">
                    <cat.icon className="h-8 w-8 text-accent" />
                    <div>
                      <div className="gold-accent-line" />
                      <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground tracking-editorial">
                        {cat.title}
                      </h2>
                    </div>
                  </div>
                </ScrollReveal>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.items.map((product, i) => (
                    <ScrollReveal key={product._id} delay={i * 0.05}>
                      <div className="glass-card rounded-xl overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                        <div className="h-56 overflow-hidden relative">
                          <img
                            src={product.image ? `${API_BASE_URL}/uploads/${product.image}` : cat.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          {!product.image && <div className="absolute inset-0 bg-accent/5" />}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{product.desc}</p>
                          <div className="flex items-center gap-2 text-[10px] text-accent mt-auto border-t border-accent/10 pt-4">
                            <Star className="h-3 w-3 fill-accent" />
                            <span className="font-heading font-bold uppercase tracking-widest">{product.useCases}</span>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
          )
        ))
      )}

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="gold-accent-line mx-auto" />
            <h2 className="font-heading font-extrabold text-3xl text-primary-foreground tracking-editorial mb-4">
              Need a <span className="text-accent">Custom Solution?</span>
            </h2>
            <p className="text-primary-foreground/60 max-w-lg mx-auto mb-8 text-balance">
              We specialize in bespoke manufacturing solutions tailored to your brand's exact specifications.
            </p>
            <Link to="/contact">
              <Button variant="gold" size="lg" className="h-14 px-10 text-lg font-bold">
                Get Custom Quote <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Products;
