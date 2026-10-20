import Link from "next/link";
import { Leaf, ArrowUpRight } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-main">
        <div className="site-footer-brand">
          <Link href="/" className="brand-lockup footer-brand" aria-label="Dr. Mululi African Herbal Medicine home">
            <span className="brand-mark"><Leaf size={24} /></span>
            <span className="brand-copy"><strong>Dr. Mululi</strong><small>African Herbal Medicine</small></span>
          </Link>
          <p>Rooted in African botanical heritage, guided by thoughtful care, and here to help you make informed choices.</p>
        </div>
        <div className="site-footer-links">
          <strong>Explore</strong>
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact Us</Link>
        </div>
        <div className="site-footer-links">
          <strong>Helpful links</strong>
          <Link href="/#how">How It Works</Link>
          <Link href="/#reviews">Reviews</Link>
          <Link href="/privacy">Privacy policy <ArrowUpRight size={13} /></Link>
          <Link href="/terms">Terms of use <ArrowUpRight size={13} /></Link>
        </div>
        <div className="site-footer-contact">
          <span className="site-footer-kicker">WE’RE HERE TO HELP</span>
          <h3>Let’s talk about your questions.</h3>
          <p>Contact our team for product information and ordering assistance.</p>
          <Link className="site-footer-contact-link" href="/contact">Get in touch <ArrowUpRight size={15} /></Link>
        </div>
      </div>
      <div className="container site-footer-bottom">
        <span>© {new Date().getFullYear()} DrMululi.com. All rights reserved.</span>
        <span className="site-footer-disclaimer">Product information is educational and is not a substitute for professional medical advice.</span>
        <Link href="/admin/login">Admin</Link>
      </div>
    </footer>
  );
}
