"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, BookOpen, HeartHandshake, Leaf, MessageCircle, ShieldCheck, Sprout, UsersRound } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const values = [
  { icon: Leaf, title: "Inspired by nature", text: "Our collection draws inspiration from Africa’s rich plant life and the traditional botanical knowledge passed through generations." },
  { icon: BookOpen, title: "Clear product information", text: "We believe people should have the opportunity to ask questions, review product details, and understand what they are considering." },
  { icon: HeartHandshake, title: "Personal, respectful service", text: "Every question matters. We aim to make it easier to get information and support before deciding whether to place an order." },
  { icon: ShieldCheck, title: "Responsible choices", text: "We encourage careful reading, informed decisions, and qualified medical guidance when a health concern needs professional care." },
];

const steps = [
  { number: "01", title: "Explore at your pace", text: "Browse our collection and read the available product descriptions." },
  { number: "02", title: "Ask what matters to you", text: "Contact our team about product details, availability, and ordering." },
  { number: "03", title: "Choose with information", text: "Review the information and seek qualified healthcare advice when appropriate before making your decision." },
];

export default function AboutPage() {
  const reduceMotion = useReducedMotion();
  return (
    <main className="about-page">
      <SiteHeader />
      <section className="about-page-hero">
        <div className="about-page-orb about-page-orb-one" /><div className="about-page-orb about-page-orb-two" />
        <motion.div className="container about-page-hero-grid" initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="about-page-hero-copy">
            <span className="about-page-kicker"><Leaf size={15} /> OUR STORY · OUR ROOTS · OUR COMMITMENT</span>
            <h1>African botanical heritage, guided by <em>thoughtful care.</em></h1>
            <p>At Dr. Mululi African Herbal Medicine, we bring a deep respect for traditional plant knowledge together with a welcoming, people-first approach to product information and service.</p>
            <div className="about-page-actions"><Link className="about-page-primary" href="/products">Explore our collection <ArrowRight size={16} /></Link><Link className="about-page-secondary" href="/contact"><MessageCircle size={15} /> Ask us a question</Link></div>
            <div className="about-hero-assurance"><span><BadgeCheck size={16} /></span><p><strong>We believe trust starts with transparency.</strong><small>Ask questions. Review details. Make informed choices.</small></p></div>
          </div>
          <motion.div className="about-page-portrait" aria-label="Portrait of Dr. Mululi" role="img" animate={reduceMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <div className="about-portrait-frame"><Image src="/products/drmululi.png" alt="Dr. Mululi" fill priority sizes="(max-width: 680px) 90vw, 42vw" style={{ objectFit: "cover", objectPosition: "center top" }} /></div>
            <div className="about-portrait-badge"><span><Sprout size={20} /></span><div><strong>Tradition with purpose</strong><small>Nature · Knowledge · Care</small></div></div>
            <span className="about-portrait-decor about-portrait-decor-one" /><span className="about-portrait-decor about-portrait-decor-two" />
          </motion.div>
        </motion.div>
        <div className="about-page-hero-edge" />
      </section>

      <section className="about-page-intro">
        <div className="container about-intro-grid">
          <motion.div className="about-intro-heading" initial={reduceMotion ? false : { opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .55 }}>
            <span className="about-light-kicker">THE HEART OF DR. MULULI</span>
            <h2>Honouring tradition.<br /><em>Serving with care.</em></h2>
            <span className="title-underline" />
            <div className="about-intro-stamp"><Leaf size={21} /><span>Rooted in African botanical heritage</span></div>
          </motion.div>
          <motion.div className="about-intro-story" initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: .08 }}>
            <p className="about-intro-lead">Our work is inspired by the natural richness of Africa and the knowledge communities have built around plants over generations.</p>
            <p className="about-intro-body">Dr. Mululi African Herbal Medicine is committed to making conversations about its herbal collection welcoming and straightforward. We want customers to feel comfortable exploring product information, asking questions, and understanding the details available before they decide to order.</p>
            <p className="about-intro-body">We recognise that every person and health situation is different. We encourage customers to read product labels and directions carefully and to consult a qualified healthcare professional about health concerns, prescribed medicines, pregnancy, or ongoing conditions.</p>
            <Link href="/products" className="about-inline-link">Get to know our collection <ArrowRight size={15} /></Link>
          </motion.div>
        </div>
      </section>

      <section className="about-values-section">
        <div className="container">
          <div className="about-values-heading"><span className="about-light-kicker">WHAT GUIDES US</span><h2>Trust is built in the details.</h2><p>Our values shape how we present the collection, answer questions, and support customers.</p></div>
          <div className="about-values-grid">{values.map((value, index) => { const Icon = value.icon; return <motion.article key={value.title} className="about-value-card" initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .5, delay: index * .08 }}><span className="about-value-icon"><Icon size={25} /></span><span className="about-value-number">0{index + 1}</span><h3>{value.title}</h3><p>{value.text}</p></motion.article>; })}</div>
        </div>
      </section>

      <section className="about-journey-section">
        <div className="container">
          <div className="about-journey-heading"><span className="about-light-kicker">A SIMPLE, PEOPLE-FIRST EXPERIENCE</span><h2>From curiosity to a confident choice.</h2><p>We want it to feel easy to find information, ask questions, and understand the next step.</p></div>
          <div className="about-journey-grid">{steps.map((step, index) => <motion.article key={step.number} className="about-journey-card" initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .45, delay: index * .08 }}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></motion.article>)}</div>
        </div>
      </section>

      <section className="about-responsibility-section">
        <div className="container about-responsibility-grid">
          <div className="about-responsibility-icon"><ShieldCheck size={34} /><span><Leaf size={17} /></span></div>
          <div><span className="about-light-kicker">YOUR WELLBEING MATTERS</span><h2>Care means being clear.</h2><p>Herbal products can have risks and interactions. Review ingredients and directions, and speak with a qualified healthcare professional—especially if you are pregnant, managing a health condition, or taking prescribed medicines. Our team can help with product information, but cannot replace medical advice.</p></div>
          <Link href="/contact" className="about-responsibility-link">Talk to our team <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="about-final-cta">
        <div className="container about-final-cta-inner"><div><span>READY TO EXPLORE?</span><h2>Start with a question. Continue with confidence.</h2><p>Browse the collection or reach out for help with product information and ordering.</p></div><div className="about-final-cta-actions"><Link href="/products" className="about-page-primary">Explore products <ArrowRight size={16} /></Link><Link href="/contact" className="about-final-contact">Contact us <ArrowRight size={15} /></Link></div></div>
      </section>
      <SiteFooter />
    </main>
  );
}
