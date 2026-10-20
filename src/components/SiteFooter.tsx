import Link from "next/link";
import { ArrowRight, ArrowUpRight, Leaf, Mail, MapPin, MessageCircle, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";

export default function SiteFooter() {
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+256 700 123 456";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@drmululi.com";
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "256700123456").replace(/\D/g, "");

  return (
    <footer className="site-footer">
      <div className="site-footer-top-shape" aria-hidden="true" />
      <div className="container site-footer-promo">
        <div className="site-footer-promo-icon"><Sparkles size={23} /></div>
        <div className="site-footer-promo-copy">
          <span>YOUR NEXT STEP STARTS WITH A CONVERSATION</span>
          <h2>Questions about our herbal collection?</h2>
          <p>We’re happy to help you explore product details and understand what to consider before ordering.</p>
        </div>
        <div className="site-footer-promo-actions">
          <a href={"https://wa.me/" + whatsapp} target="_blank" rel="noopener noreferrer" className="site-footer-whatsapp"><MessageCircle size={17} /> Chat on WhatsApp <ArrowRight size={15} /></a>
          <Link href="/products" className="site-footer-browse">Browse products <ArrowUpRight size={15} /></Link>
        </div>
      </div>

      <div className="container site-footer-main">
        <div className="site-footer-brand">
          <Link href="/" className="brand-lockup footer-brand" aria-label="Dr. Mululi African Herbal Medicine home">
            <span className="brand-mark"><Leaf size={24} /></span>
            <span className="brand-copy"><strong>Dr. Mululi</strong><small>African Herbal Medicine</small></span>
          </Link>
          <p>Inspired by Africa’s rich botanical heritage. We share product information with care and welcome questions, so you can make informed decisions for yourself and your family.</p>
          <div className="site-footer-promise"><ShieldCheck size={16} /><span>Thoughtful information. Personal service. Informed choices.</span></div>
        </div>

        <div className="site-footer-links">
          <strong>Discover</strong>
          <Link href="/">Home <ArrowRight size={13} /></Link>
          <Link href="/about">Our story <ArrowRight size={13} /></Link>
          <Link href="/products">Explore products <ArrowRight size={13} /></Link>
          <Link href="/contact">Contact us <ArrowRight size={13} /></Link>
        </div>

        <div className="site-footer-links">
          <strong>Helpful resources</strong>
          <Link href="/how-it-works">How ordering works <ArrowRight size={13} /></Link>
          <Link href="/reviews">Customer reviews <ArrowRight size={13} /></Link>
          <Link href="/privacy">Privacy policy <ArrowUpRight size={13} /></Link>
          <Link href="/terms">Terms of use <ArrowUpRight size={13} /></Link>
        </div>

        <div className="site-footer-contact">
          <span className="site-footer-kicker">LET’S CONNECT</span>
          <h3>Real questions deserve a thoughtful response.</h3>
          <p>Reach out for product information, ordering questions, or help finding the right details.</p>
          <a href={"tel:" + phone.replace(/[^+\d]/g, "")} className="site-footer-contact-row"><span><PhoneCall size={15} /></span><div><small>Call our team</small><strong>{phone}</strong></div></a>
          <a href={"mailto:" + email} className="site-footer-contact-row"><span><Mail size={15} /></span><div><small>Email us</small><strong>{email}</strong></div></a>
          <div className="site-footer-contact-row"><span><MapPin size={15} /></span><div><small>Based in</small><strong>{process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "Kampala, Uganda"}</strong></div></div>
          <Link className="site-footer-contact-link" href="/contact">Visit contact page <ArrowRight size={15} /></Link>
        </div>
      </div>

      <div className="container site-footer-bottom">
        <span>© {new Date().getFullYear()} DrMululi.com. All rights reserved.</span>
        <span className="site-footer-disclaimer">Herbal products are not a substitute for professional medical advice, diagnosis, or treatment. Please review product details and consult a qualified healthcare professional when appropriate.</span>
        <Link href="/admin/login">Admin <ArrowUpRight size={12} /></Link>
      </div>
      <div className="site-footer-final-note"><Leaf size={13} /> Rooted in tradition. Shared with care.</div>
    </footer>
  );
}
