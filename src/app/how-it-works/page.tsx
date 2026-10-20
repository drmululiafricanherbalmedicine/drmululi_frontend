"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ClipboardList, HeartHandshake, Leaf, MessageCircle, PackageCheck, ShieldCheck, Stethoscope } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const steps = [
  { number: "01", icon: Leaf, title: "Explore the collection", text: "Browse product pages at your own pace. Read the available descriptions, sizes, prices, and important product notes before deciding what to ask about." },
  { number: "02", icon: MessageCircle, title: "Ask questions first", text: "Contact our team for product information, availability, and ordering details. Share only what you are comfortable sharing; please do not send private medical records over chat." },
  { number: "03", icon: ClipboardList, title: "Confirm the details", text: "Before placing an order, confirm the exact product, price, quantity, delivery arrangements, ingredients, and any instructions provided with the product." },
  { number: "04", icon: PackageCheck, title: "Arrange your order", text: "Once the details are clear, our team can help you understand the next steps for placing and receiving your order." },
];

export default function HowItWorksPage() {
  return <main className="journey-page">
    <SiteHeader />
    <section className="journey-hero">
      <div className="journey-hero-pattern" aria-hidden="true"><span/><span/><span/></div>
      <div className="container journey-hero-inner">
        <motion.div className="journey-hero-copy" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.55}}>
          <span className="journey-kicker"><Leaf size={14}/> A clearer way to explore</span>
          <h1>Good choices begin<br/>with <em>clear information.</em></h1>
          <p>From exploring African botanical products to arranging an order, we want every step to feel simple, thoughtful, and transparent.</p>
          <div className="journey-hero-actions">
            <Link href="/products" className="journey-primary-btn">Explore products <ArrowRight size={16}/></Link>
            <Link href="/contact" className="journey-secondary-btn">Ask a question <MessageCircle size={16}/></Link>
          </div>
          <div className="journey-hero-assurance"><ShieldCheck size={17}/><span>Take your time. Ask questions. Make informed choices.</span></div>
        </motion.div>
        <motion.div className="journey-hero-art" initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}} transition={{duration:.65,delay:.12}}>
          <div className="journey-art-orbit orbit-a"/><div className="journey-art-orbit orbit-b"/>
          <div className="journey-art-leaf"><Leaf size={86} strokeWidth={1.15}/></div>
          <div className="journey-art-note"><span className="journey-art-note-icon"><CheckCircle2 size={18}/></span><div><strong>Clarity at every step</strong><small>Product details · Friendly support</small></div></div>
          <div className="journey-art-stamp"><Stethoscope size={22}/><span>CARE<br/>FIRST</span></div>
        </motion.div>
      </div>
      <div className="journey-hero-wave" aria-hidden="true"/>
    </section>

    <section className="journey-steps-section section">
      <div className="container">
        <div className="journey-section-heading"><span className="eyebrow">How it works</span><h2 className="section-title">Four simple steps.<br/><em>No pressure, just guidance.</em></h2><p>We aim to make it easy to understand the product range and know what to do next.</p></div>
        <div className="journey-steps-grid">{steps.map((step,i)=>{const Icon=step.icon;return <motion.article className="journey-step-card" key={step.number} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-30px"}} transition={{duration:.4,delay:i*.08}}><div className="journey-step-top"><span className="journey-step-icon"><Icon size={23}/></span><span className="journey-step-number">{step.number}</span></div><h3>{step.title}</h3><p>{step.text}</p><span className="journey-step-rule"/></motion.article>})}</div>
      </div>
    </section>

    <section className="journey-care-section">
      <div className="container journey-care-inner">
        <div className="journey-care-emblem"><div><HeartHandshake size={40}/></div><span>Care with<br/>consideration</span></div>
        <div className="journey-care-copy"><span className="eyebrow">Your wellbeing matters</span><h2>Traditional knowledge,<br/><em>informed decisions.</em></h2><p>Herbal products can have risks, interact with medicines, or be unsuitable for some people. Product information is not a diagnosis or a promise of results. Please talk with a qualified healthcare professional about symptoms, ongoing conditions, pregnancy, or medicines you take.</p><div className="journey-care-points"><span><CheckCircle2 size={16}/> Ask about ingredients and directions</span><span><CheckCircle2 size={16}/> Keep prescribed care in place</span><span><CheckCircle2 size={16}/> Seek urgent care for serious symptoms</span></div></div>
      </div>
    </section>

    <section className="journey-next-section section"><div className="container"><div className="journey-next-card"><div className="journey-next-icon"><MessageCircle size={28}/></div><div><span className="eyebrow">We’re here to help</span><h2>Have a question before you order?</h2><p>Reach out for product details, availability, or help understanding the ordering process.</p></div><div className="journey-next-actions"><Link href="/contact" className="journey-primary-btn">Contact our team <ArrowRight size={16}/></Link><Link href="/reviews" className="journey-next-link">Read or share a review <ArrowRight size={14}/></Link></div></div></div></section>
    <SiteFooter />
  </main>;
}
