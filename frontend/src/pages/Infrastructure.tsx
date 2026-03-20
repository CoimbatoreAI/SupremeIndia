import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Settings as SettingIcon } from "lucide-react";
import factoryOverview from "@/assets/factory-overview.jpg";
import heroFactory from "@/assets/hero-factory.jpg";
import dieCutting from "@/assets/die-cutting-machine.jpg";
import packagingProduction from "@/assets/packaging-production.jpg";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5069";

interface Machine {
  _id: string;
  name: string;
  capacity: string;
  features: string[];
  image?: string;
}

const Infrastructure = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/machines`)
      .then(res => res.json())
      .then(data => {
        setMachines(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching machines:", err);
        setLoading(false);
      });
  }, []);

  const machineImages = [heroFactory, dieCutting, factoryOverview, packagingProduction];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img src={factoryOverview} alt="Infrastructure" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40">
          <div className="gold-accent-line" />
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-primary-foreground tracking-editorial mb-4">
            Our <span className="text-accent">Infrastructure</span>
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl text-balance">
            State-of-the-art machinery and world-class production capabilities with cutting-edge German technology.
          </p>
        </div>
      </section>

      {/* Counters */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter end={machines.length || 4} label="Production Lines" />
          <AnimatedCounter end={190} suffix="K+" label="Daily Capacity" />
          <AnimatedCounter end={6} label="Color Printing" />
          <AnimatedCounter end={24} suffix="/7" label="Operations" />
        </div>
      </section>

      {/* Machines */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 font-heading font-bold text-muted-foreground uppercase tracking-widest text-xs">Calibrating machinery details...</p>
        </div>
      ) : (
        machines.map((machine, idx) => (
          <section key={machine._id} className={`section-padding ${idx % 2 === 0 ? "bg-background" : "bg-secondary"}`}>
            <div className="container mx-auto">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <ScrollReveal direction={idx % 2 === 0 ? "left" : "right"}>
                  <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={machine.image ? `${API_BASE_URL}/uploads/${machine.image}` : machineImages[idx % machineImages.length]}
                      alt={machine.name}
                      className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-[2s]"
                    />
                    <div className="absolute top-6 right-6 bg-accent/90 backdrop-blur-md text-accent-foreground px-6 py-3 rounded-full font-heading font-extrabold text-xs uppercase tracking-widest shadow-lg">
                      {machine.capacity}
                    </div>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.2} direction={idx % 2 === 0 ? "right" : "left"}>
                  <div className="max-w-xl">
                    <div className="gold-accent-line" />
                    <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground tracking-editorial mb-6 leading-tight">
                      {machine.name}
                    </h2>
                    <div className="flex items-center gap-3 mb-8 bg-accent/5 p-4 rounded-xl border border-accent/10 w-fit">
                      <SettingIcon className="h-5 w-5 text-accent animate-spin-slow" />
                      <span className="text-accent font-heading font-bold text-sm uppercase tracking-wide">Capacity: {machine.capacity}</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      {machine.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
                          <Zap className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm font-medium leading-normal">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        ))
      )}

      {/* Process */}
      <section className="py-24 bg-primary relative">
        <div className="container mx-auto px-4 z-10 relative">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <div className="gold-accent-line mx-auto" />
              <h2 className="font-heading font-extrabold text-4xl text-primary-foreground tracking-editorial mb-6">
                Advanced Production <span className="text-accent">Process</span>
              </h2>
              <p className="text-primary-foreground/60 text-lg">Four stages of manufacturing excellence to ensure global quality standards.</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Design & Prepress", desc: "Collaborative design process with digital prepress & color proofing." },
              { step: "02", title: "Offset Printing", desc: "6-colour high-definition reproduction on Heidelberg machinery." },
              { step: "03", title: "Technical Finishing", desc: "Precision die-cutting, luxury foiling, and structured lamination." },
              { step: "04", title: "Logistics Optimization", desc: "Rigorous quality inspection and international-ready packaging." },
            ].map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 0.1}>
                <div className="text-center p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/[0.08] transition-all hover:border-accent/30 group">
                  <div className="text-accent font-heading font-extrabold text-4xl mb-6 opacity-40 group-hover:opacity-100 transition-opacity">{s.step}</div>
                  <h3 className="font-heading font-extrabold text-sm text-primary-foreground mb-4 uppercase tracking-widest">{s.title}</h3>
                  <p className="text-primary-foreground/50 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 skew-x-[-20deg] pointer-events-none" />
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container mx-auto text-center">
          <ScrollReveal>
            <div className="gold-accent-line mx-auto" />
            <h2 className="font-heading font-extrabold text-4xl text-foreground tracking-editorial mb-6">
              Request a <span className="text-accent">Facility Tour</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10 text-lg">
              Visit our manufacturing hub in Tirupur to witness our high-capacity operations and quality standards.
            </p>
            <Link to="/contact">
              <Button variant="gold" size="lg" className="h-16 px-12 text-lg font-bold shadow-2xl shadow-accent/20">
                Contact For Visit <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Infrastructure;
