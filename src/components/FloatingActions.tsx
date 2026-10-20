"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M16 2.5A13.35 13.35 0 0 0 4.5 22.6L2.7 29.3l6.9-1.8A13.35 13.35 0 1 0 16 2.5Z" />
      <path fill="currentColor" d="M23.1 19.2c-.39-.2-2.28-1.13-2.63-1.26-.35-.13-.61-.2-.87.2-.26.39-1 1.26-1.22 1.52-.22.26-.45.29-.84.1-.39-.2-1.65-.61-3.14-1.94-1.16-1.03-1.94-2.3-2.17-2.69-.22-.39-.02-.6.17-.79.17-.17.39-.45.58-.68.19-.22.26-.39.39-.65.13-.26.06-.49-.03-.68-.1-.2-.87-2.1-1.19-2.87-.31-.75-.63-.65-.87-.66h-.74c-.26 0-.68.1-1.03.49-.35.39-1.35 1.32-1.35 3.22s1.38 3.73 1.57 3.99c.19.26 2.72 4.15 6.59 5.82.92.4 1.64.64 2.2.82.92.29 1.76.25 2.42.15.74-.11 2.28-.93 2.6-1.83.32-.9.32-1.67.22-1.83-.1-.16-.35-.26-.74-.45Z" transform="translate(1 0)" />
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
