"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Leaf, Menu, MessageCircle, X } from "lucide-react";

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="#25D366" d="M16 2.5A13.35 13.35 0 0 0 4.5 22.6L2.7 29.3l6.9-1.8A13.35 13.35 0 1 0 16 2.5Z" />
      <path fill="#fff" d="M23.1 19.2c-.39-.2-2.28-1.13-2.63-1.26-.35-.13-.61-.2-.87.2-.26.39-1 1.26-1.22 1.52-.22.26-.45.29-.84.1-.39-.2-1.65-.61-3.14-1.94-1.16-1.03-1.94-2.3-2.17-2.69-.22-.39-.02-.6.17-.79.17-.17.39-.45.58-.68.19-.22.26-.39.39-.65.13-.26.06-.49-.03-.68-.1-.2-.87-2.1-1.19-2.87-.31-.75-.63-.65-.87-.66h-.74c-.26 0-.68.1-1.03.49-.35.39-1.35 1.32-1.35 3.22s1.38 3.73 1.57 3.99c.19.26 2.72 4.15 6.59 5.82.92.4 1.64.64 2.2.82.92.29 1.76.25 2.42.15.74-.11 2.28-.93 2.6-1.83.32-.9.32-1.67.22-1.83-.1-.16-.35-.26-.74-.45Z" transform="translate(1 0)" />
    </svg>
  );
}
import { graphqlRequest } from "@/lib/graphql";

const links = [
  { label: "Home", href: "/#home", active: (path: string) => path === "/" },
  { label: "About Us", href: "/about", active: (path: string) => path === "/about" },
  { label: "Products", href: "/products", active: (path: string) => path.startsWith("/products") },
  { label: "How It Works", href: "/how-it-works", active: (path: string) => path === "/how-it-works" },
  { label: "Reviews", href: "/reviews", active: (path: string) => path === "/reviews" },
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
  const whatsapp = (business.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "256700123456").replace(/\D/g, "");

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
        <a className="mobile-whatsapp-link" href={"https://wa.me/" + whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}><WhatsAppIcon size={20} /> Chat on WhatsApp</a>
      </nav>}
    </header>
  );
}
