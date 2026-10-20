"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, HeartHandshake, Leaf, MessageCircle, ShieldCheck, Star, UsersRound } from "lucide-react";
import { graphqlRequest } from "@/lib/graphql";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function ReviewsPage() {
  const [rating,setRating]=useState(5);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [body,setBody]=useState("");
  const [productId,setProductId]=useState("");
  const [done,setDone]=useState(false);
  const [error,setError]=useState("");
  const [busy,setBusy]=useState(false);
  async function submit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();setError("");setBusy(true);
    try {
      const d=await graphqlRequest<{submitReview:{success:boolean;message:string}}>(
        "mutation SubmitReview($name:String!,$rating:Int!,$body:String!,$email:String,$productId:String){submitReview(name:$name,rating:$rating,body:$body,email:$email,productId:$productId){success message}}",
        {name,rating,body,email:email||null,productId:productId||null}
      );
      if(d.submitReview.success) setDone(true); else setError(d.submitReview.message||"We could not submit your review. Please try again.");
    } catch(err) { setError(err instanceof Error?err.message:"We could not submit your review. Please try again."); }
    finally { setBusy(false); }
  }
  return <main className="reviews-page">
    <SiteHeader />
    <section className="reviews-hero">
      <div className="reviews-hero-glow" aria-hidden="true"/>
      <div className="container reviews-hero-inner">
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
          <span className="reviews-kicker"><HeartHandshake size={14}/> Trust grows through honest conversations</span>
          <h1>Real voices.<br/><em>Thoughtful care.</em></h1>
          <p>We value honest feedback from people who have interacted with Dr. Mululi African Herbal Medicine. Your words help us understand the experience we provide and where we can do better.</p>
          <a href="#share-review" className="reviews-hero-button">Share your experience <ArrowRight size={16}/></a>
          <div className="reviews-hero-trust"><span><ShieldCheck size={17}/> Moderated for respectful, relevant feedback</span><span><BadgeCheck size={17}/> No invented testimonials</span></div>
        </motion.div>
        <motion.div className="reviews-hero-visual" initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}} transition={{duration:.6,delay:.1}}>
          <div className="reviews-visual-ring ring-one"/><div className="reviews-visual-ring ring-two"/>
          <div className="reviews-quote-mark">“</div><div className="reviews-visual-leaf"><Leaf size={72} strokeWidth={1.15}/></div>
          <div className="reviews-visual-note"><span className="reviews-note-stars">★★★★★</span><strong>Your honest voice matters</strong><small>Every experience deserves to be heard with respect.</small></div>
        </motion.div>
      </div>
      <div className="reviews-hero-wave" aria-hidden="true"/>
    </section>

    <section className="reviews-values-section section"><div className="container"><div className="reviews-section-heading"><span className="eyebrow">Our promise</span><h2 className="section-title">Trust is built on <em>honesty.</em></h2><p>We want reviews to be useful, fair, and respectful—not exaggerated promises about health outcomes.</p></div>
      <div className="reviews-values-grid">
        {[{icon:ShieldCheck,title:"Respectful moderation",text:"Reviews are checked before publication to help keep the space useful and appropriate."},{icon:UsersRound,title:"Genuine experiences",text:"We invite customers to share their own experience in their own words. We do not create testimonials."},{icon:HeartHandshake,title:"Feedback that helps",text:"Tell us what went well or what could be clearer, including product information and service."}].map((item,i)=>{const Icon=item.icon;return <motion.article className="reviews-value-card" key={item.title} initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><span className="reviews-value-icon"><Icon size={23}/></span><h3>{item.title}</h3><p>{item.text}</p></motion.article>})}
      </div>
      <div className="reviews-empty-note"><div className="reviews-empty-icon"><Star size={22}/></div><div><strong>Customer stories belong to customers.</strong><p>We’re building this space around submitted and approved feedback. Until genuine reviews are available to display, we won’t fill it with made-up ratings or quotes.</p></div></div>
    </div></section>

    <section id="share-review" className="reviews-form-section section"><div className="container reviews-form-layout">
      <div className="reviews-form-intro"><span className="eyebrow">Share your experience</span><h2 className="section-title">Your feedback<br/><em>makes a difference.</em></h2><p>Tell us about your experience with our service or product information. Please avoid sharing private medical details, and do not use reviews as a request for medical advice.</p><div className="reviews-form-promise"><ShieldCheck size={20}/><div><strong>Submitted for review</strong><span>Your review is sent to our team for moderation before it appears publicly.</span></div></div><Link href="/contact" className="reviews-contact-link">Need help instead? Contact us <ArrowRight size={14}/></Link></div>
      <motion.div className="reviews-form-card" initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
        {done ? <div className="reviews-success"><span><BadgeCheck size={34}/></span><h3>Thank you for sharing.</h3><p>Your review has been submitted for moderation. We appreciate you taking the time to give thoughtful feedback.</p><Link href="/products" className="journey-primary-btn">Explore products <ArrowRight size={15}/></Link></div> : <form onSubmit={submit}>
          <div className="reviews-form-top"><span className="reviews-form-symbol"><Leaf size={20}/></span><div><strong>Write a review</strong><small>Honest feedback helps us improve.</small></div></div>
          <label className="reviews-field">Your name<input required maxLength={100} value={name} onChange={e=>setName(e.target.value)} placeholder="Name you'd like displayed"/></label>
          <label className="reviews-field">Email <span>(optional)</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="For follow-up only"/></label>
          <label className="reviews-field">Product name or ID <span>(optional)</span><input value={productId} onChange={e=>setProductId(e.target.value)} placeholder="Leave blank for general feedback"/></label>
          <fieldset className="reviews-rating-field"><legend>Your rating</legend><div className="reviews-star-picker" role="radiogroup" aria-label="Your rating">{[1,2,3,4,5].map(n=><button type="button" key={n} onClick={()=>setRating(n)} aria-label={`Rate ${n} out of 5 stars`} aria-pressed={rating===n} className={n<=rating?"selected":""}><Star size={27} fill="currentColor"/></button>)}</div><small>{rating} out of 5 stars</small></fieldset>
          <label className="reviews-field">Your review<textarea required minLength={10} maxLength={2000} value={body} onChange={e=>setBody(e.target.value)} placeholder="Share what your experience was like…" rows={5}/><small>10–2,000 characters. Please keep health details private.</small></label>
          {error&&<p role="alert" className="reviews-error">{error}</p>}
          <button type="submit" disabled={busy} className="reviews-submit-button">{busy?"Submitting review…":"Submit for moderation"} <ArrowRight size={16}/></button>
          <p className="reviews-form-disclaimer"><ShieldCheck size={13}/> Reviews are moderated. Please be honest, respectful, and avoid medical claims or personal health information.</p>
        </form>}
      </motion.div>
    </div></section>
    <SiteFooter />
  </main>;
}
