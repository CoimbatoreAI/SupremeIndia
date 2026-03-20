import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ArrowRight, Tag, Printer, Package, Award, Cog, Globe, ChevronRight } from "lucide-react";
import heroFactory from "@/assets/hero-factory.jpg";
import labelsCloseup from "@/assets/labels-closeup.jpg";
import packagingProduction from "@/assets/packaging-production.jpg";
import exLogo from "@/assets/ex.png";
import leLogo from "@/assets/le.png";
import priLogo from "@/assets/pri.png";
import trLogo from "@/assets/tr.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5069";

const products = [
  { name: "Tags", icon: Tag, desc: "Premium garment tags" },
  { name: "Main Labels", icon: Tag, desc: "Woven & printed" },
  { name: "Printed Labels", icon: Printer, desc: "High-definition print" },
  { name: "Sticker Labels", icon: Tag, desc: "Self-adhesive solutions" },
  { name: "Price Tags", icon: Tag, desc: "Retail-ready pricing" },
  { name: "Wash Care Labels", icon: Tag, desc: "Durable care instructions" },
  { name: "Size Labels", icon: Tag, desc: "Precision sizing" },
  { name: "Brand Labels", icon: Award, desc: "Identity solutions" },
  { name: "Printed Tapes", icon: Printer, desc: "Custom branded tapes" },
  { name: "Header Cards", icon: Package, desc: "Retail display cards" },
  { name: "Belly Bands", icon: Package, desc: "Product wrapping" },
  { name: "PDQ Trays", icon: Package, desc: "Point-of-sale displays" },
  { name: "Mono Cartons", icon: Package, desc: "Premium packaging" },
  { name: "Board Hangers", icon: Package, desc: "Display solutions" },
  { name: "Boxes", icon: Package, desc: "Custom box solutions" },
];

const machines = [
  { name: "6 Colour Heidelberg Offset", capacity: "40,000 sheets/shift" },
  { name: "Auto Die Cutting Machine", capacity: "50,000 sheets/shift" },
  { name: "Window Film Pasting", capacity: "50,000 pcs/shift" },
  { name: "Side Pasting Machine", capacity: "50,000 pcs/shift" },
];

const Index = () => {
  const [brochure, setBrochure] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/settings/brochure`)
      .then(res => res.json())
      .then(data => setBrochure(data.value))
      .catch(err => console.error("Error fetching brochure:", err));
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={heroFactory} alt="Supreme India Manufacturing Facility" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40">
          <div className="max-w-3xl">
            <div className="gold-accent-line" />
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground tracking-editorial leading-tight mb-6">
              Premium Tags, Labels & Packaging Solutions{" "}
              <span className="text-accent">Manufacturer</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl font-body leading-relaxed mb-10 max-w-2xl text-balance">
              Delivering precision, scale, and quality for global brands. Your trusted partner for export-quality manufacturing solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button variant="gold" size="lg" className="text-base px-8 h-14 font-bold">
                  Get Quote <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="gold-outline" size="lg" className="text-base px-8 h-14 font-bold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  View Products
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <AnimatedCounter end={25} suffix="+" label="Years Experience" />
            <AnimatedCounter end={15} suffix="+" label="Product Categories" />
            <AnimatedCounter end={158} suffix="M+" label="Annual Capacity (₹)" />
            <AnimatedCounter end={50} suffix="K+" label="Daily Production" />
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="gold-accent-line" />
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground tracking-editorial mb-6">
                Built by <span className="text-accent">MNC-Level Experts</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                SUPREME INDIA is a partnership-based manufacturing company built by experienced sales and production experts with over 25 years in the industry. We combine deep domain expertise with advanced infrastructure to deliver export-quality products at scale.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-accent font-heading font-semibold text-sm uppercase tracking-wide-custom hover:gap-3 transition-all duration-300">
                Learn More About Us <ChevronRight className="h-4 w-4" />
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="relative group">
                <img src={labelsCloseup} alt="Premium labels and tags" className="rounded-lg shadow-xl w-full transition-transform duration-500 group-hover:scale-[1.02]" />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-lg font-heading shadow-xl">
                  <div className="text-3xl font-extrabold">25+</div>
                  <div className="text-xs uppercase tracking-wide-custom">Years of Excellence</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="gold-accent-line mx-auto" />
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground tracking-editorial mb-4">
                Our <span className="text-accent">Product Range</span>
              </h2>
              <p className="text-muted-foreground">
                Comprehensive manufacturing solutions spanning tags, labels, packaging, and custom branding materials.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product, i) => (
              <ScrollReveal key={product.name} delay={i * 0.05}>
                <Link to="/products" className="glass-card rounded-lg p-5 text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block">
                  <product.icon className="h-8 w-8 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wide-custom text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-xs">{product.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="navy" size="lg" className="h-14 px-10 font-bold">
                View All Products <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Machinery */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <img src={packagingProduction} alt="Packaging production line" className="rounded-lg shadow-xl w-full" />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="gold-accent-line" />
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground tracking-editorial mb-6">
                Advanced <span className="text-accent">Machinery</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Equipped with state-of-the-art German and industrial-grade machinery for precision manufacturing at scale.
              </p>
              <div className="space-y-4">
                {machines.map((m) => (
                  <div key={m.name} className="flex items-center gap-4 p-4 glass-card rounded-lg hover:shadow-md transition-shadow">
                    <Cog className="h-6 w-6 text-accent shrink-0 animate-spin-slow" />
                    <div>
                      <h4 className="font-heading font-bold text-sm text-foreground">{m.name}</h4>
                      <p className="text-muted-foreground text-xs">{m.capacity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/infrastructure" className="inline-flex items-center gap-2 text-accent font-heading font-semibold text-sm uppercase tracking-wide-custom hover:gap-3 transition-all duration-300 mt-8">
                View Full Infrastructure <ChevronRight className="h-4 w-4" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Impact Section Placeholder (Existing kiabi code etc.) */}
      <section className="relative py-24 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="gold-accent-line mx-auto" />
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-primary-foreground tracking-editorial mb-4">
                Global <span className="text-accent">Impact</span>
              </h2>
              <p className="text-primary-foreground/60">Partnering with international brands to deliver at scale</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { brand: "KIABI", projection: "3–4 Lakh pcs/month", value: "₹78M+", subtitle: "Annual Order Value" },
              { brand: "OLD NAVY", projection: "4–5 Lakh pcs/month", value: "₹80M+", subtitle: "Annual Order Value" },
            ].map((cs, i) => (
              <ScrollReveal key={cs.brand} delay={i * 0.15}>
                <div className="glass-card rounded-xl p-8 text-center bg-primary-foreground/5 border border-primary-foreground/10">
                  <h3 className="font-heading font-extrabold text-2xl text-primary-foreground tracking-editorial mb-2">{cs.brand}</h3>
                  <div className="text-accent font-heading font-extrabold text-4xl my-4 tracking-tighter">{cs.value}</div>
                  <p className="text-primary-foreground/60 text-sm mb-1">{cs.subtitle}</p>
                  <div className="mt-4 pt-4 border-t border-primary-foreground/10 flex items-center justify-center gap-2 text-primary-foreground/60 text-sm">
                    <Globe className="h-4 w-4 text-accent" /> {cs.projection}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Logos */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-xs uppercase tracking-widest text-accent mb-2">Trusted By Global Leaders</h2>
            </div>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 items-center">
            {[
              { src: exLogo, alt: "Ex Logo" },
              { src: leLogo, alt: "Le Logo" },
              { src: priLogo, alt: "Pri Logo" },
              { src: trLogo, alt: "Tr Logo" },
            ].map((brand, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="h-14 md:h-20 w-auto flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <img src={brand.src} alt={brand.alt} className="max-h-full w-auto drop-shadow-sm" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="gold-accent-line mx-auto" />
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground tracking-editorial">Client <span className="text-accent">Testimonials</span></h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { quote: "Supreme India delivers consistent quality at scale. Their Heidelberg printing capability sets them apart.", author: "Sourcing Director", company: "International Retail Brand" },
              { quote: "Precision and attention to detail in their manufacturing is exceptional. A truly reliable B2B partner.", author: "Production Manager", company: "Garment Export House" },
            ].map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="glass-card rounded-xl p-8 border border-accent/5">
                  <div className="text-accent text-5xl font-heading mb-4 select-none opacity-20">"</div>
                  <p className="text-muted-foreground leading-relaxed mb-6 italic text-sm">{t.quote}</p>
                  <div>
                    <p className="font-heading font-bold text-xs text-foreground uppercase tracking-widest">{t.author}</p>
                    <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest mt-1 text-accent">{t.company}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative container mx-auto px-4 text-center z-10">
          <ScrollReveal>
            <div className="gold-accent-line mx-auto" />
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-primary-foreground tracking-editorial mb-6">
              Ready to <span className="text-accent">Scale Your Brand?</span>
            </h2>
            <p className="text-primary-foreground/60 max-w-xl mx-auto mb-12 text-lg text-balance">
              Let's discuss how our precision manufacturing can power your brand's growth.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/contact">
                <Button variant="gold" size="lg" className="h-16 px-12 text-lg font-bold shadow-2xl shadow-accent/20">
                  Partner With Us <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              {brochure && (
                <a href={`${API_BASE_URL}/api/settings/brochure/download`} download target="_blank">
                  <Button variant="gold-outline" size="lg" className="h-16 px-12 text-lg font-bold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    Download Brochure
                  </Button>
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      </section>
    </div>
  );
};

export default Index;
