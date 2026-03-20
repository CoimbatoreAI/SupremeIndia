import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Award, Cog, Users, Shield, Factory, Sparkles } from "lucide-react";
import heroFactory from "@/assets/hero-factory.jpg";
import factoryOverview from "@/assets/factory-overview.jpg";
import dieCutting from "@/assets/die-cutting-machine.jpg";

const strengths = [
  { icon: Factory, title: "High Production Capacity", desc: "50,000+ units daily across multiple production lines" },
  { icon: Award, title: "Export-Level Quality", desc: "Meeting international standards for global brands" },
  { icon: Cog, title: "Advanced Machinery", desc: "German-engineered Heidelberg offset printing systems" },
  { icon: Users, title: "Skilled Workforce", desc: "Experienced team of printing & packaging professionals" },
];

const infrastructure = [
  "Heidelberg 6 Colour Offset Machine",
  "Auto Die Cutting",
  "Window Film Pasting",
  "Side Pasting",
  "Polar Cutting Machines",
];

const specialEffects = [
  { icon: Sparkles, name: "Embossing", desc: "Raised surface texturing for premium feel" },
  { icon: Sparkles, name: "Debossing", desc: "Recessed impressions for elegant branding" },
  { icon: Sparkles, name: "Foiling", desc: "Metallic foil stamping for luxury finish" },
];

const About = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroFactory} alt="Supreme India facility" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40">
          <div className="gold-accent-line" />
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-primary-foreground tracking-editorial mb-4">
            About <span className="text-accent">Supreme India</span>
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Precision Printing. Premium Packaging. Trusted Manufacturing.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="gold-accent-line" />
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground tracking-editorial mb-6">
                Our <span className="text-accent">Story</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SUPREME INDIA is a partnership firm founded by seasoned professionals with MNC-level expertise in sales, production, and manufacturing. With over 25 years of collective experience in the printing and packaging industry, we understand the precise demands of global brands.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our facility in Tirupur—India's garment export hub—is strategically positioned to serve the textile, retail, and FMCG industries with unmatched speed and quality.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From tags and labels to premium mono cartons and PDQ trays, every product is manufactured under strict quality controls to meet international standards.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <img src={factoryOverview} alt="Factory overview" className="rounded-lg shadow-xl w-full" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Counters */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter end={25} suffix="+" label="Years Experience" />
          <AnimatedCounter end={50} suffix="K+" label="Daily Capacity" />
          <AnimatedCounter end={15} suffix="+" label="Product Lines" />
          <AnimatedCounter end={3} label="Office Locations" />
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <img src={dieCutting} alt="Die cutting machine" className="rounded-lg shadow-xl w-full" />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="gold-accent-line" />
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground tracking-editorial mb-6">
                World-Class <span className="text-accent">Infrastructure</span>
              </h2>
              <div className="space-y-3">
                {infrastructure.map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 glass-card rounded-lg">
                    <Cog className="h-5 w-5 text-accent shrink-0" />
                    <span className="font-heading font-semibold text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Special Effects */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="gold-accent-line mx-auto" />
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground tracking-editorial mb-4">
                Special <span className="text-accent">Effects</span>
              </h2>
              <p className="text-muted-foreground">Premium finishing capabilities for luxury branding</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {specialEffects.map((e, i) => (
              <ScrollReveal key={e.name} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <e.icon className="h-10 w-10 text-accent mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-foreground mb-2">{e.name}</h3>
                  <p className="text-muted-foreground text-sm">{e.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="section-padding bg-primary">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="gold-accent-line mx-auto" />
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-primary-foreground tracking-editorial mb-4">
                Our <span className="text-accent">Strengths</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengths.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.1}>
                <div className="text-center p-6 rounded-xl border border-primary-foreground/10 hover:border-accent/30 transition-all duration-300">
                  <s.icon className="h-10 w-10 text-accent mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-sm text-primary-foreground mb-2">{s.title}</h3>
                  <p className="text-primary-foreground/60 text-xs">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
