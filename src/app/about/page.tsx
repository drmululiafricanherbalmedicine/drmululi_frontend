"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, FlaskConical, Leaf, ShieldCheck, Sprout, UsersRound } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const values = [
  { icon: Leaf, title: "Rooted in nature", text: "Our story draws inspiration from Africa’s rich botanical heritage and generations of traditional plant knowledge." },
  { icon: FlaskConical, title: "Thoughtful formulation", text: "We believe product information should be clear, accessible, and shared with care." },
  { icon: UsersRound, title: "Personal service", text: "We welcome questions and help customers understand product details before making decisions." },
];

export default function AboutPage() {
  const reduceMotion = useReducedMotion();
  return (
    <main className="about-page">
      <SiteHeader />
      <section className="about-page-hero">
        <div className="about-page-orb about-page-orb-one" /><div className="about-page-orb about-page-orb-two" />
        <motion.div className="container about-page-hero-grid" initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div>
            <span className="about-page-kicker"><Leaf size={15} /> OUR STORY · OUR ROOTS · OUR COMMITMENT</span>
            <h1>African botanical heritage, guided by <em>thoughtful care.</em></h1>
            <p>Dr. Mululi African Herbal Medicine celebrates traditional knowledge and the natural world while helping customers access clear product information and personal service.</p>
            <div className="about-page-actions"><Link className="about-page-primary" href="/products">Explore our products <ArrowRight size={16} /></Link><Link className="about-page-secondary" href="/contact">Talk to our team <ArrowRight size={15} /></Link></div>
          </div>
          <motion.div className="about-page-illustration" aria-label="Illustration of a botanical plant" role="img" animate={reduceMotion ? undefined : { y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <div className="about-illustration-halo" />
            <div className="about-illustration-circle"><Sprout size={150} strokeWidth={1.1} /></div>
            <span className="about-floating-leaf about-floating-leaf-a"><Leaf size={34} /></span><span className="about-floating-leaf about-floating-leaf-b"><Leaf size={25} /></span>
            <div className="about-illustration-label"><span><CheckCircle2 size={17} /></span><div><strong>Care in every conversation</strong><small>Tradition · Information · Service</small></div></div>
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
          </motion.div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: .08 }}>
            <p className="about-intro-lead">For more than 15 years, Dr. Mululi has focused on exploring herbal formulations inspired by the rich plant life and traditional knowledge of Africa.</p>
            <p className="about-intro-body">Our aim is to make conversations about our collection welcoming and straightforward. We want customers to be able to ask questions, learn about products, and make informed choices with appropriate professional guidance when needed.</p>
            <p className="about-intro-body">We recognise that traditional practices and modern healthcare each have an important context. Our website provides product information and customer support; it does not replace diagnosis, treatment, or advice from a qualified healthcare professional.</p>
          </motion.div>
        </div>
      </section>

      <section className="about-values-section">
        <div className="container">
          <div className="about-values-heading"><span className="about-light-kicker">WHAT GUIDES US</span><h2>Our values, from root to leaf.</h2><p>The principles behind how we share our story, present our products, and support our customers.</p></div>
          <div className="about-values-grid">{values.map((value, index) => { const Icon = value.icon; return <motion.article key={value.title} className="about-value-card" initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .5, delay: index * .1 }}><span className="about-value-icon"><Icon size={25} /></span><span className="about-value-number">0{index + 1}</span><h3>{value.title}</h3><p>{value.text}</p></motion.article>; })}</div>
        </div>
      </section>

      <section className="about-responsibility-section">
        <div className="container about-responsibility-grid">
          <div className="about-responsibility-icon"><ShieldCheck size={34} /><span><Leaf size={17} /></span></div>
          <div><span className="about-light-kicker">INFORMED CHOICES MATTER</span><h2>Care means being clear.</h2><p>We encourage every customer to review product ingredients and directions, ask questions, and consult a qualified healthcare professional—especially when pregnant, managing a health condition, or taking prescribed medicines.</p></div>
          <Link href="/contact" className="about-responsibility-link">Contact our team <ArrowRight size={16} /></Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
