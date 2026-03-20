import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Building2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const offices = [
  { city: "Tirupur (HQ)", address: "D.No.1, Linga Gounder Extension, Odakkadu, Tirupur – 641602" },
  { city: "Delhi (Noida)", address: "Noida, Uttar Pradesh" },
  { city: "Bangalore", address: "Bangalore, Karnataka" },
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", requirement: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format message for WhatsApp
    const message = `*New Inquiry via Website*%0A%0A` +
      `*Name:* ${form.name}%0A` +
      `*Phone:* ${form.phone}%0A` +
      `*Email:* ${form.email}%0A` +
      `*Requirement:* ${form.requirement}%0A` +
      `*Message:* ${form.message}`;

    // WhatsApp URL
    const whatsappUrl = `https://wa.me/917200323073?text=${message}`;

    // Open in new window
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Opening WhatsApp...",
      description: "Redirecting you to WhatsApp to send your inquiry.",
    });

    setForm({ name: "", phone: "", email: "", requirement: "", message: "" });
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40">
          <div className="gold-accent-line" />
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-primary-foreground tracking-editorial mb-4">
            Contact <span className="text-accent">Us</span>
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Let's discuss how we can power your brand with precision manufacturing.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <ScrollReveal>
              <div className="gold-accent-line" />
              <h2 className="font-heading font-extrabold text-2xl text-foreground tracking-editorial mb-8">
                Send Us a <span className="text-accent">Message</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="bg-secondary border-border focus:border-accent h-12"
                />
                <Input
                  placeholder="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="bg-secondary border-border focus:border-accent h-12"
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="bg-secondary border-border focus:border-accent h-12"
                />
                <Input
                  placeholder="Requirement (e.g., Tags, Labels, Packaging)"
                  value={form.requirement}
                  onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                  className="bg-secondary border-border focus:border-accent h-12"
                />
                <Textarea
                  placeholder="Your Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className="bg-secondary border-border focus:border-accent resize-none"
                />
                <Button variant="gold" size="lg" type="submit" className="w-full">
                  <Send className="h-4 w-4" /> Send on WhatsApp
                </Button>
              </form>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal delay={0.2}>
              <div className="gold-accent-line" />
              <h2 className="font-heading font-extrabold text-2xl text-foreground tracking-editorial mb-8">
                Get in <span className="text-accent">Touch</span>
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 p-5 glass-card rounded-xl">
                  <Phone className="h-5 w-5 text-accent mt-1 shrink-0" />
                  <div>
                    <h3 className="font-heading font-bold text-sm text-foreground mb-1">Phone</h3>
                    <a href="tel:7200323073" className="text-muted-foreground text-sm hover:text-accent transition-colors block">7200323073 (Office)</a>
                    <a href="tel:7418332139" className="text-muted-foreground text-sm hover:text-accent transition-colors block">7418332139</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 glass-card rounded-xl">
                  <Mail className="h-5 w-5 text-accent mt-1 shrink-0" />
                  <div>
                    <h3 className="font-heading font-bold text-sm text-foreground mb-1">Email</h3>
                    <a href="mailto:supremeindiainc@gmail.com" className="text-muted-foreground text-sm hover:text-accent transition-colors">supremeindiainc@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 glass-card rounded-xl">
                  <MapPin className="h-5 w-5 text-accent mt-1 shrink-0" />
                  <div>
                    <h3 className="font-heading font-bold text-sm text-foreground mb-1">Head Office</h3>
                    <p className="text-muted-foreground text-sm">D.No.1, Linga Gounder Extension, Odakkadu, Tirupur – 641602</p>
                  </div>
                </div>
              </div>

              {/* Offices */}
              <h3 className="font-heading font-bold text-sm uppercase tracking-wide-custom text-accent mb-4">Our Offices</h3>
              <div className="space-y-3">
                {offices.map((o) => (
                  <div key={o.city} className="flex items-center gap-3 p-3 glass-card rounded-lg">
                    <Building2 className="h-4 w-4 text-accent shrink-0" />
                    <div>
                      <span className="font-heading font-bold text-xs text-foreground">{o.city}</span>
                      <span className="text-muted-foreground text-xs ml-2">{o.address}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* GST */}
              <div className="mt-8 p-4 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <span className="font-heading font-bold text-foreground">GST:</span> 33AFIFS2497E1ZU
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.8!2d77.35!3d11.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDA2JzAwLjAiTiA3N8KwMjEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Supreme India Location"
        />
      </section>
    </div>
  );
};

export default Contact;
