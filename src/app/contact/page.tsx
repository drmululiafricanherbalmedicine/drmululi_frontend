"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Clock3, Leaf, Mail, MapPin, MessageCircle,
  Phone, ShieldCheck, Sprout, Sparkles
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { graphqlRequest } from "@/lib/graphql";

export default function ContactPage() {
  const [business, setBusiness] = useState<Record<string, string>>({});
  const reduceMotion = useReducedMotion();

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
  const whatsappUrl = "https://wa.me/" + whatsapp;
  const email = business.contactEmail || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@drmululi.com";
  const address = business.businessAddress || process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "Kampala, Uganda";
  const floatTransition = (duration: number, delay: number) => reduceMotion
    ? {}
    : { duration, delay, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" as const };

  return (
    <main className="contact-page">
      <SiteHeader />

      <section className="contact-hero">
        <div className="contact-hero-glow contact-hero-glow-one" />
        <div className="contact-hero-glow contact-hero-glow-two" />
        <div className="contact-hero-orbit" aria-hidden="true" />
        <motion.div className="contact-floating-leaf leaf-one" aria-hidden="true" animate={reduceMotion ? undefined : { y: [0, -16, 0], rotate: [-16, -4, -16] }} transition={floatTransition(6, 0)}>
          <Leaf size={54} />
        </motion.div>
        <motion.div className="contact-floating-leaf leaf-two" aria-hidden="true" animate={reduceMotion ? undefined : { y: [0, 18, 0], rotate: [22, 8, 22] }} transition={floatTransition(7, 0.6)}>
          <Sprout size={72} />
        </motion.div>
        <motion.div className="contact-floating-leaf leaf-three" aria-hidden="true" animate={reduceMotion ? undefined : { y: [0, -12, 0], rotate: [10, 24, 10] }} transition={floatTransition(5, 0.3)}>
          <Leaf size={34} />
        </motion.div>
        <div className="container contact-hero-inner">
          <motion.div
            className="contact-hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="contact-kicker"><Sparkles size={14} /> ROOTED IN CARE. CONNECTED BY NATURE.</span>
            <h1>Let’s start a <em>healthier</em> conversation.</h1>
            <p>Questions about our botanical collection or placing an order? We’re happy to help you find the information you need.</p>
            <div className="contact-hero-actions">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-whatsapp-button"><MessageCircle size={17} /> Chat on WhatsApp <ArrowRight size={16} /></a>
              <a href="#send-message" className="contact-scroll-link">Send us a message <ArrowRight size={15} /></a>
            </div>
            <div className="contact-hero-note"><ShieldCheck size={17} /> Personal service, thoughtful answers.</div>
          </motion.div>
          <motion.div className="contact-botanical-art" aria-label="Botanical leaves illustration" role="img"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.88, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}>
            <div className="botanical-sun" />
            <div className="botanical-ring botanical-ring-one" />
            <div className="botanical-ring botanical-ring-two" />
            <svg className="botanical-stem-art" viewBox="0 0 360 390" fill="none" aria-hidden="true">
              <path d="M175 356C176 295 165 238 189 176C205 134 232 95 265 57" stroke="#b6d978" strokeWidth="5" strokeLinecap="round" />
              <path d="M176 301C136 279 107 248 93 210" stroke="#b6d978" strokeWidth="4" strokeLinecap="round" />
              <path d="M183 248C222 231 252 203 270 167" stroke="#b6d978" strokeWidth="4" strokeLinecap="round" />
              <path d="M195 190C165 165 151 137 154 106" stroke="#b6d978" strokeWidth="4" strokeLinecap="round" />
              <path d="M174 331C137 321 113 300 99 271" stroke="#b6d978" strokeWidth="4" strokeLinecap="round" />
              <path d="M250 80C211 83 195 62 200 29C232 32 257 49 250 80Z" fill="#b8d96b" />
              <path d="M111 237C72 239 49 218 51 184C85 190 109 207 111 237Z" fill="#8fb74e" />
              <path d="M258 190C258 153 282 130 315 133C309 167 289 189 258 190Z" fill="#d4e99b" />
              <path d="M154 133C119 115 111 85 129 57C157 78 168 106 154 133Z" fill="#d4e99b" />
              <path d="M119 291C82 282 66 254 77 224C108 240 125 263 119 291Z" fill="#c2df81" />
              <path d="M203 241C201 207 221 183 253 183C250 214 232 237 203 241Z" fill="#7fa843" />
              <path d="M175 356C163 365 153 373 145 384" stroke="#b6d978" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div className="botanical-caption"><span className="botanical-caption-icon"><Leaf size={17} /></span><span><strong>African botanical heritage</strong><small>Tradition meets thoughtful care</small></span></div>
            <motion.span className="botanical-sparkle sparkle-one" animate={reduceMotion ? undefined : { opacity: [0.35, 1, 0.35], scale: [0.8, 1.15, 0.8] }} transition={floatTransition(3.2, 0)}><Sparkles size={23} /></motion.span>
            <motion.span className="botanical-sparkle sparkle-two" animate={reduceMotion ? undefined : { opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.1, 0.9] }} transition={floatTransition(4, 0.7)}><Sparkles size={16} /></motion.span>
          </motion.div>
        </div>
        <div className="contact-hero-bottom-line" />
      </section>

      <section className="contact-details-section">
        <div className="container">
          <motion.div className="contact-details-grid" initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
            <a href={"tel:" + phone.replace(/[^+\d]/g, "")} className="contact-detail-card">
              <span className="contact-detail-icon"><Phone size={21} /></span>
              <span className="contact-detail-copy"><small>GIVE US A CALL</small><strong>{phone}</strong><em>Speak with our team <ArrowRight size={13} /></em></span>
            </a>
            <a href={"mailto:" + email} className="contact-detail-card">
              <span className="contact-detail-icon"><Mail size={21} /></span>
              <span className="contact-detail-copy"><small>WRITE TO US</small><strong>{email}</strong><em>Send an email <ArrowRight size={13} /></em></span>
            </a>
            <div className="contact-detail-card">
              <span className="contact-detail-icon"><MapPin size={21} /></span>
              <span className="contact-detail-copy"><small>FIND OUR TEAM</small><strong>{address}</strong><em>Serving you with care</em></span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="contact-message-section" id="send-message">
        <div className="container contact-message-layout">
          <motion.div className="contact-message-copy" initial={reduceMotion ? false : { opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
            <span className="contact-section-kicker"><Leaf size={15} /> WE’RE LISTENING</span>
            <h2>Tell us what’s<br /><em>on your mind.</em></h2>
            <p>Send a note and our team will get back to you. For product questions, you can include the product name so we can give you more relevant information.</p>
            <div className="contact-promise">
              <span><Clock3 size={19} /></span>
              <div><strong>We value your time</strong><p>We’ll respond as soon as we can during our available hours.</p></div>
            </div>
            <div className="contact-promise">
              <span><ShieldCheck size={19} /></span>
              <div><strong>Your questions matter</strong><p>We’re here to help with product details and order enquiries—not to replace professional medical advice.</p></div>
            </div>
            <div className="contact-leaf-divider"><span /><Leaf size={18} /><span /></div>
            <p className="contact-medical-note">If you have a health concern, speak with a qualified healthcare professional. Do not delay urgent care or stop prescribed treatment based on information from this website.</p>
          </motion.div>
          <motion.div className="contact-form-wrap" initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay: 0.08 }}>
            <div className="contact-form-heading"><span>WE’RE JUST A MESSAGE AWAY</span><h3>Send us a message</h3><p>Fill in the details below and we’ll be in touch.</p></div>
            <ContactForm />
            <p className="contact-form-footnote"><ShieldCheck size={14} /> Your details are used to respond to your enquiry.</p>
          </motion.div>
        </div>
      </section>

      <section className="contact-last-cta">
        <div className="container contact-last-cta-inner">
          <div><span>GOOD THINGS GROW FROM A CONVERSATION</span><h2>Prefer a quick chat?</h2><p>Reach us directly on WhatsApp and let us know how we can help.</p></div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-last-cta-button"><MessageCircle size={18} /> Chat on WhatsApp <ArrowRight size={16} /></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
