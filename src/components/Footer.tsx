import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface FooterProps {
  onScrollToSection?: (targetId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const scrollTo = (id: string) => {
    if (onScrollToSection) {
      onScrollToSection(id);
    } else {
      if (id === 'hem') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full bg-[#f4f4f1] border-t border-[#eeeeeb] mt-16 sm:mt-24">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="flex flex-col gap-3">
            <span className="font-editorial text-2xl text-[#1a1c1b] tracking-tight">
              SÖDER &amp; SAX
            </span>
            <p className="text-xs sm:text-sm text-[#4b4640] leading-relaxed">
              Klassiskt barberarhantverk, traditionell knivrakning och modern skandinavisk estetik på Södermalm.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTo('hem')}
                className="text-[11px] font-semibold uppercase text-[#695c51] hover:text-[#1a1c1b] transition-colors cursor-pointer"
              >
                Hem
              </button>
              <span className="text-[#cec5bd]">•</span>
              <button
                type="button"
                onClick={() => scrollTo('behandlingar')}
                className="text-[11px] font-semibold uppercase text-[#695c51] hover:text-[#1a1c1b] transition-colors cursor-pointer"
              >
                Behandlingar
              </button>
              <span className="text-[#cec5bd]">•</span>
              <button
                type="button"
                onClick={() => scrollTo('barberare')}
                className="text-[11px] font-semibold uppercase text-[#695c51] hover:text-[#1a1c1b] transition-colors cursor-pointer"
              >
                Barberare
              </button>
              <span className="text-[#cec5bd]">•</span>
              <button
                type="button"
                onClick={() => scrollTo('direktbokning')}
                className="text-[11px] font-semibold uppercase text-[#695c51] hover:text-[#1a1c1b] transition-colors cursor-pointer"
              >
                Boka
              </button>
              <span className="text-[#cec5bd]">•</span>
              <button
                type="button"
                onClick={() => scrollTo('kontakt')}
                className="text-[11px] font-semibold uppercase text-[#695c51] hover:text-[#1a1c1b] transition-colors cursor-pointer"
              >
                Hitta Hit
              </button>
            </div>
          </div>

          {/* Address Col */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold uppercase text-[#4b4640] tracking-wider">
              Ateljé &amp; Adress
            </span>
            <p className="text-sm text-[#1a1c1b] leading-relaxed">
              Nytorgsgatan 24<br />
              116 40 Stockholm<br />
              Södermalm (intill Nytorget)
            </p>
            <p className="text-xs sm:text-sm text-[#695c51] mt-1">
              <a href="tel:086421980" className="hover:underline cursor-pointer">
                Tel: 08-642 19 80
              </a>
            </p>
          </div>

          {/* Hours Col */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold uppercase text-[#4b4640] tracking-wider">
              Öppettider
            </span>
            <div className="text-sm text-[#1a1c1b] space-y-1.5 max-w-[200px]">
              <div className="flex justify-between">
                <span className="text-[#4b4640]">Tis – Fre</span>
                <span className="font-medium">09:00 – 19:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4b4640]">Lördag</span>
                <span className="font-medium">10:00 – 16:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4b4640]">Sön – Mån</span>
                <span className="text-[#695c51]">Stängt</span>
              </div>
            </div>
          </div>

          {/* Newsletter Col */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold uppercase text-[#4b4640] tracking-wider">
              Nyhetsbrev
            </span>
            <p className="text-xs sm:text-sm text-[#4b4640] leading-relaxed">
              Få diskreta uppdateringar om säsongens ritualer och tidsbokningar.
            </p>
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 text-xs font-medium text-[#1a1c1b] bg-white p-2.5 rounded border border-[#eeeeeb]">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Tack för din anmälan!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col gap-2 mt-1">
                <div className="flex items-center bg-white rounded-lg p-1 shadow-xs border border-[#eeeeeb]">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="E-postadress"
                    className="w-full bg-transparent px-3 py-1.5 text-[#1a1c1b] text-xs sm:text-sm focus:outline-none placeholder:text-[#7d766f]"
                  />
                  <button
                    type="submit"
                    className="bg-[#1c1a18] text-white px-4 py-2 rounded text-xs font-medium hover:bg-[#4b4640] transition-colors cursor-pointer shrink-0"
                  >
                    Sänd
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="mt-12 pt-6 border-t border-[#eeeeeb] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#4b4640] text-xs">
          <p>© 2025 Söder &amp; Sax Stockholm AB. Alla rättigheter förbehållna.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#1a1c1b] transition-colors cursor-pointer">
              Integritetspolicy
            </span>
            <span className="hover:text-[#1a1c1b] transition-colors cursor-pointer">
              Bokningsvillkor
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
