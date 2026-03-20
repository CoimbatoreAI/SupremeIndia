import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Products", path: "/products" },
  { label: "Infrastructure", path: "/infrastructure" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-primary/95 backdrop-blur-md shadow-lg py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4">
          <img src="/logo.png" alt="Supreme India Logo" className="h-14 w-auto md:h-20" />
          <div className="font-heading font-extrabold text-2xl md:text-3xl lg:text-4xl text-primary-foreground tracking-editorial">
            SUPREME <span className="text-accent">INDIA</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link text-primary-foreground/80 hover:text-accent ${location.pathname === item.path ? "text-accent" : ""
                }`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact">
            <Button variant="gold" size="sm" className="gap-2">
              <Phone className="h-3.5 w-3.5" />
              Get Quote
            </Button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-primary-foreground p-2"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-primary/98 backdrop-blur-md border-t border-accent/20">
          <nav className="container mx-auto py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-primary-foreground/80 hover:text-accent font-heading text-sm tracking-wide-custom uppercase py-2 ${location.pathname === item.path ? "text-accent" : ""
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact">
              <Button variant="gold" size="sm" className="w-full mt-2">
                Get Quote
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
