import React, { useState } from 'react';
import { IMAGES, TESTIMONIALS } from '../data/salonData';
import { MapPin, Phone, Mail, Clock, Star, Navigation, CheckCircle2, Send } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const testimonial = TESTIMONIALS[0];
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName.trim() && formEmail.trim() && formMessage.trim()) {
      setFormSent(true);
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    }
  };

  return (
    <section
      id="kontakt"
      className="w-full py-16 lg:py-24 max-w-[1280px] mx-auto px-4 lg:px-8 border-t border-[#eeeeeb] scroll-mt-20"
    >
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-[11px] font-semibold uppercase text-[#695c51] tracking-widest block mb-2">
          Om Salongen &amp; Kontakt
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#1a1c1b] tracking-tight mb-4">
          Välkommen till ateljén på Nytorgsgatan
        </h2>
        <p className="text-base sm:text-lg text-[#4b4640] leading-relaxed">
          I ett sekelskifteshus intill Nytorget på Södermalm har vi format en lugn miljö med fokus på personlig omtanke, klassiskt hantverk och stillhet.
        </p>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-white p-6 rounded-2xl border border-[#eeeeeb] shadow-sm mb-12">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[#695c51] mb-1">
            <MapPin className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">Besöksadress</span>
          </div>
          <p className="font-semibold text-[#1a1c1b] text-base">Nytorgsgatan 24</p>
          <p className="text-xs sm:text-sm text-[#4b4640]">116 40 Stockholm, Södermalm</p>
          <p className="text-xs text-[#695c51]">Ett stenkast från Nytorget &amp; Urban Deli</p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[#695c51] mb-1">
            <Phone className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">Telefon</span>
          </div>
          <a
            href="tel:086421980"
            className="font-semibold text-[#1a1c1b] hover:text-[#695c51] text-base block cursor-pointer transition-colors"
          >
            08-642 19 80
          </a>
          <p className="text-xs sm:text-sm text-[#4b4640]">Vardagar 09:00 – 18:00</p>
          <p className="text-xs text-[#695c51]">Svarar snarast mellan sittningar</p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[#695c51] mb-1">
            <Mail className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">E-post</span>
          </div>
          <a
            href="mailto:atelje@soderochsax.se"
            className="font-semibold text-[#1a1c1b] hover:text-[#695c51] text-base block cursor-pointer transition-colors"
          >
            atelje@soderochsax.se
          </a>
          <p className="text-xs sm:text-sm text-[#4b4640]">För allmänna förfrågningar</p>
          <p className="text-xs text-[#695c51]">Svar inom 24 timmar</p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[#695c51] mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">Öppettider</span>
          </div>
          <p className="text-xs sm:text-sm text-[#1a1c1b] font-medium">Tis – Fre: 09:00 – 19:00</p>
          <p className="text-xs sm:text-sm text-[#1a1c1b] font-medium">Lördag: 10:00 – 16:00</p>
          <p className="text-xs text-[#695c51]">Söndag &amp; Måndag stängt</p>
        </div>
      </div>

      {/* Main Grid: Map & Contact Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Map Column */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden shadow-sm relative bg-[#e8e8e5] border border-[#eeeeeb]">
            <img
              src={IMAGES.mapSodermalm}
              alt="Karta Nytorgsgatan 24 Stockholm"
              className="w-full h-full object-cover"
            />
            {/* Transit pill overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#eeeeeb] flex items-center gap-2.5 text-xs text-[#1a1c1b] shadow-sm">
              <Navigation className="w-4 h-4 text-[#695c51] shrink-0" />
              <span>Närmaste T-bana: Medborgarplatsen (5 min promenad) eller Skanstull. Busslinje 2 &amp; 3 stannar på Nytorgsgatan.</span>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="bg-[#f4f4f1] p-5 sm:p-6 rounded-xl border border-[#eeeeeb] shadow-xs">
            <div className="flex items-center gap-1 text-[#695c51] mb-2.5">
              {[...Array(testimonial.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="font-editorial italic text-base sm:text-lg text-[#1a1c1b] leading-relaxed">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <span className="text-[11px] font-semibold uppercase text-[#695c51] tracking-wider block mt-2.5">
              — {testimonial.author}, {testimonial.tag}
            </span>
          </div>
        </div>

        {/* Contact Message Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#eeeeeb] shadow-sm">
          <span className="text-[11px] font-semibold uppercase text-[#695c51] tracking-widest block mb-1.5">
            Frågor &amp; Förfrågningar
          </span>
          <h3 className="font-editorial text-2xl text-[#1a1c1b] mb-2">
            Skicka ett meddelande
          </h3>
          <p className="text-xs sm:text-sm text-[#4b4640] mb-6 leading-relaxed">
            Har du frågor inför ditt besök, vill boka för ett herrsällskap eller har speciella önskemål? Skriv till oss så återkommer vi inom kort.
          </p>

          {formSent ? (
            <div className="p-6 bg-[#f4f4f1] rounded-xl text-center space-y-3 border border-[#eeeeeb] animate-in fade-in duration-200">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-sm text-[#1a1c1b]">Tack för ditt meddelande!</h4>
              <p className="text-xs text-[#4b4640] leading-relaxed">
                Vi har tagit emot ditt meddelande och svarar via e-post eller telefon inom kort.
              </p>
              <button
                type="button"
                onClick={() => setFormSent(false)}
                className="mt-2 text-xs font-semibold text-[#1a1c1b] hover:text-[#695c51] underline underline-offset-4 cursor-pointer"
              >
                Skicka ett till meddelande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitMessage} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase text-[#4b4640] tracking-wider">
                  Ditt Namn *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="För- och efternamn"
                  className="bg-[#f9f9f6] border border-[#eeeeeb] px-3.5 py-2.5 rounded-lg text-sm text-[#1a1c1b] focus:outline-none focus:ring-1 focus:ring-[#1c1a18]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase text-[#4b4640] tracking-wider">
                  E-postadress *
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="din.epost@exempel.se"
                  className="bg-[#f9f9f6] border border-[#eeeeeb] px-3.5 py-2.5 rounded-lg text-sm text-[#1a1c1b] focus:outline-none focus:ring-1 focus:ring-[#1c1a18]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase text-[#4b4640] tracking-wider">
                  Meddelande *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Hur kan vi hjälpa dig?"
                  className="bg-[#f9f9f6] border border-[#eeeeeb] px-3.5 py-2.5 rounded-lg text-sm text-[#1a1c1b] focus:outline-none focus:ring-1 focus:ring-[#1c1a18]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1c1a18] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#4b4640] transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Skicka meddelande
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
