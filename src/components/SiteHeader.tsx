"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Leaf, Menu, MessageCircle, X } from "lucide-react";
import { graphqlRequest } from "@/lib/graphql";

const links = [
  { label: "Home", href: "/#home", active: (path: string) => path === "/" },
  { label: "About Us", href: "/about", active: (path: string) => path === "/about" },
  { label: "Products", href: "/products", active: (path: string) => path.startsWith("/products") },
  { label: "How It Works", href: "/#how", active: () => false },
  { label: "Reviews", href: "/#reviews", active: (path: string) => path === "/reviews" },
  { label: "Contact Us", href: "/contact", active: (path: string) => path === "/contact" },
];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [business, setBusiness] = useState<Record<string, string>>({});
  const pathname = usePathname();
  useEffect(() => {
    graphqlRequest<{ publicSiteSettings: string[] }>("query { publicSiteSettings }")
      .then((data) => setBusiness(Object.fromEntries(data.publicSiteSettings.map((item) => {
        const setting = JSON.parse(item);
        return [setting.key, setting.value];
      }))))
      .catch(() => {});
  }, []);
  const phone = business.contactPhone || process.env.NEXT_PUBLIC_CONTACT_PHONE || "+256 700 123 456";
  const whatsapp = (business.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "256700123456").replace(/\\D/g, "");

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand-lockup" aria-label="Dr. Mululi African Herbal Medicine home" onClick={() => setMobileMenuOpen(false)}>
          <span className="brand-mark"><Leaf size={25} /></span>
          <span className="brand-copy"><strong>Dr. Mululi</strong><small>African Herbal Medicine</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <Link key={link.label} href={link.href} className={`nav-link ${link.active(pathname) ? "nav-link-active" : ""}`}>{link.label}</Link>)}
        </nav>
        <a className="header-contact-cta btn btn-outline" href={"https://wa.me/" + whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> <span>{phone}</span></a>
        <button type="button" className="mobile-menu-toggle" aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" onClick={() => setMobileMenuOpen((open) => !open)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileMenuOpen && <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">
        {links.map((link) => <Link key={link.label} href={link.href} className={link.active(pathname) ? "mobile-nav-active" : ""} onClick={() => setMobileMenuOpen(false)}>{link.label}<ArrowRight size={15} /></Link>)}
        <a className="mobile-whatsapp-link" href={"https://wa.me/" + whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}><MessageCircle size={16} /> Chat on WhatsApp</a>
      </nav>}
    </header>
  );
}
