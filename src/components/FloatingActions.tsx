"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12.2" stroke="currentColor" strokeWidth="2.1" />
      <path d="M11.3 9.6c-.4.2-1.1 1.1-1.1 2.4 0 1.2.8 2.8 2.3 4.4 1.5 1.7 3.7 3.5 6.2 4.4 1.2.4 2.2.3 2.8-.1.6-.4 1.2-1.4 1.1-2-.1-.4-.5-.5-1.2-.9l-1.8-.9c-.5-.2-.7-.1-1 .3l-.8 1c-.2.2-.4.3-.8.1-1.1-.5-2.1-1.2-3-2.1-.8-.8-1.4-1.8-1.7-2.4-.1-.3 0-.5.2-.7l.7-.8c.2-.3.2-.5.1-.8l-.8-2c-.2-.5-.5-.7-1.2-.7Z" fill="currentColor" />
    </svg>
  );
}

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "256700123456").replace(/\\D/g, "");

  useEffect(() => {
    const updateVisibility = () => setShowBackToTop(window.scrollY > 280);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <div className="floating-actions" aria-label="Quick actions">
      {showBackToTop && (
        <button
          type="button"
          className="floating-action floating-back-to-top"
          aria-label="Scroll back to top"
          title="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="floating-action-ring" aria-hidden="true" />
          <ArrowUp size={23} strokeWidth={2.4} />
        </button>
      )}
      <a
        className="floating-action floating-whatsapp"
        href={"https://wa.me/" + whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon size={23} />
      </a>
    </div>
  );
}
