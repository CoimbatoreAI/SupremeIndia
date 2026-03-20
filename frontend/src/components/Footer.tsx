import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-0">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="Supreme India Logo" className="h-14 w-auto md:h-20" />
                <div className="font-heading font-extrabold text-2xl md:text-3xl tracking-editorial">
                  SUPREME <span className="text-accent">INDIA</span>
                </div>
              </Link>
              <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
                Precision Printing. Premium Packaging. Trusted Manufacturing. Delivering export-quality solutions for global brands since 25+ years.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wide-custom text-accent mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Products", path: "/products" },
                { label: "Infrastructure", path: "/infrastructure" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-primary-foreground/60 hover:text-accent text-sm transition-colors duration-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wide-custom text-accent mb-6">
              Products
            </h4>
            <ul className="space-y-3">
              {["Tags & Labels", "Sticker Labels", "Mono Cartons", "PDQ Trays", "Printed Tapes", "Packaging Solutions"].map((item) => (
                <li key={item}>
                  <Link to="/products" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wide-custom text-accent mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent mt-1 shrink-0" />
                <span className="text-primary-foreground/60 text-sm">
                  D.No.1, Linga Gounder Extension, Odakkadu, Tirupur – 641602
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a href="tel:7200323073" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                  7200323073
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a href="mailto:supremeindiainc@gmail.com" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                  supremeindiainc@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/40 text-xs">
            © {new Date().getFullYear()} Supreme India. All rights reserved. GST: 33AFIFS2497E1ZU
          </p>
          <p className="text-primary-foreground/40 text-xs">
            Premium Manufacturing Solutions Since 25+ Years
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
