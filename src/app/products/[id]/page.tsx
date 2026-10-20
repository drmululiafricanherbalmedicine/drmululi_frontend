"use client";
import {useEffect,useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useParams} from "next/navigation";
import {ArrowRight,CheckCircle2,Leaf,MessageCircle,ShieldCheck,Truck} from "lucide-react";
import {motion} from "framer-motion";
import {graphqlRequest} from "@/lib/graphql";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
type Product={id:string;name:string;description:string;category:string;price:number;currency:string;imageUrl?:string|null;active:boolean;stock:number};
const fallback:Product[]=[
{id:"infections",name:"Infections",description:"A traditional African botanical blend in the Dr. Mululi collection. Review ingredients and guidance with a qualified healthcare professional before use. Not a substitute for diagnosis or prescribed treatment.",category:"Herbal Remedies",price:50000,currency:"UGX",imageUrl:"/products/dr-mululi-infections-500ml.png",active:true,stock:0},
{id:"cough",name:"Cough",description:"A traditional botanical blend inspired by African herbal heritage. Seek professional advice for persistent or severe respiratory symptoms.",category:"Respiratory Wellness",price:35000,currency:"UGX",imageUrl:"/products/dr-mululi-cough-500ml.png",active:true,stock:0},
{id:"malaria",name:"Malaria",description:"A traditional herbal product concept rooted in African botanical heritage. Suspected malaria requires prompt testing and effective medical treatment.",category:"Herbal Remedies",price:50000,currency:"UGX",imageUrl:"/products/dr-mululi-malaria-500ml.png",active:true,stock:0},
{id:"diabetes",name:"Diabetes",description:"A traditional botanical wellness blend. It is not a diabetes treatment and must not replace prescribed medicines, glucose monitoring, or medical advice.",category:"Wellness",price:50000,currency:"UGX",imageUrl:"/products/dr-mululi-diabetes-500ml.png",active:true,stock:0},
{id:"ulcers",name:"Ulcers",description:"A traditional botanical blend inspired by African herbal practices. Ulcers can require diagnosis and evidence-based treatment.",category:"Digestive Wellness",price:40000,currency:"UGX",imageUrl:"/products/dr-mululi-ulcers-500ml.png",active:true,stock:0},
{id:"prostate-enlargement",name:"Prostate Enlargement",description:"A traditional botanical blend within the Dr. Mululi men’s wellness collection. Urinary symptoms should be assessed by a qualified healthcare professional.",category:"Men’s Wellness",price:50000,currency:"UGX",imageUrl:"/products/dr-mululi-prostate-enlargement-500ml.png",active:true,stock:0}];
export default function ProductDetailPage(){
const params=useParams<{id:string}>(),[products,setProducts]=useState<Product[]>(fallback),[loading,setLoading]=useState(true);
useEffect(()=>{graphqlRequest<{products:Product[]}>("query { products(activeOnly:true) { id name description category price currency imageUrl active stock } }").then(d=>{if(d.products.length)setProducts(d.products)}).catch(()=>{}).finally(()=>setLoading(false));},[]);
const key=decodeURIComponent(params.id||"");
const product=products.find(p=>p.id===key||p.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")===key);
const phone=(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||"256700123456").replace(/\D/g,"");
if(!product&&loading)return <main className="detail-page"><SiteHeader /><div className="detail-loading"><div className="loading-orb"/><p>Preparing product details…</p></div><SiteFooter /></main>;
if(!product)return <main className="catalog-page"><SiteHeader /><div className="container catalog-empty"><Leaf size={34}/><h1>Product not found</h1><p>This product may no longer be available.</p><Link className="btn btn-dark mt-4" href="/products">Browse all products</Link></div><SiteFooter /></main>;
return <main className="detail-page"><SiteHeader />
<div className="container detail-breadcrumb"><Link href="/">Home</Link><ArrowRight size={13}/><Link href="/products">Products</Link><ArrowRight size={13}/><span>{product.name}</span></div>
<section className="container detail-layout"><motion.div className="detail-image-panel" initial={{opacity:0,x:-18}} animate={{opacity:1,x:0}}><div className="detail-image-glow"/><Image src={product.imageUrl||"/products/dr-mululi-infections-500ml.png"} alt={product.name+" 500 ml bottle"} width={700} height={700} priority unoptimized/><span className="detail-image-caption"><Leaf size={15}/> AFRICAN BOTANICAL COLLECTION</span></motion.div>
<motion.div className="detail-copy" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}><span className="detail-overline"><span className="detail-dot"/>{product.category}</span><h1>{product.name}</h1><div className="detail-rating-line"><span className="detail-stars">✦ ✦ ✦</span><span>Traditional botanical collection</span></div><p className="detail-description">{product.description}</p><div className="detail-price-row"><div><span className="detail-price-label">Product price</span><strong>{product.currency} {product.price.toLocaleString()}</strong></div><span className="detail-volume">500 ml bottle</span></div>
<div className="detail-cta-row"><Link href={"/order?productId="+encodeURIComponent(product.id)} className="btn btn-primary detail-order">Continue to order <ArrowRight size={17}/></Link><a href={"https://wa.me/"+phone+"?text="+encodeURIComponent("Hello, I would like to ask about "+product.name+".")} target="_blank" rel="noreferrer" className="btn btn-outline detail-whatsapp"><MessageCircle size={17}/> Ask a question</a></div>
<div className="detail-perks"><div><ShieldCheck size={20}/><span><strong>Product guidance</strong><small>Ask about ingredients and suitability</small></span></div><div><Truck size={20}/><span><strong>Ordering assistance</strong><small>Contact our team about delivery</small></span></div><div><CheckCircle2 size={20}/><span><strong>Clear information</strong><small>Review details before ordering</small></span></div></div>
<div className="detail-notice"><strong>Important health information</strong><p>Traditional herbal products are not a substitute for professional medical advice, diagnosis, or prescribed treatment. Consult a qualified healthcare professional before use, especially for serious or ongoing symptoms.</p></div></motion.div></section>
<section className="detail-bottom"><div className="container flex flex-wrap items-center justify-between gap-4"><div><span className="eyebrow">Continue exploring</span><h2 className="serif mt-2 text-2xl">Find your next product.</h2></div><Link href="/products" className="btn btn-dark">Explore all products <ArrowRight size={16}/></Link></div></section><SiteFooter /></main>}
