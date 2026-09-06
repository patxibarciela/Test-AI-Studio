import React from 'react';
import { IMAGES } from '../data/salonData';
import { Calendar, ArrowDown, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onBookClick: () => void;
  onTreatmentsClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookClick,
  onTreatmentsClick,
}) => {
  return (
    <section id="hem" className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10 lg:py-16 w-full scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Textual Column */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#eeeeeb] px-3 py-1 rounded-full">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#695c51]">
              Ateljé för herrgrooming
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[56px] text-[#1a1c1b] tracking-tight leading-[1.1]">
            Klassiskt hantverk.<br />
            <span className="italic font-normal text-[#695c51]">Nutida precision.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#4b4640] max-w-xl leading-relaxed">
            En stillsam oas på Södermalm i Stockholm tillägnad herrklippning, traditionell knivrakning och skäggvård av högsta snitt. Här möter rå kalksten och varmt läder hantverksskicklighet i absolut lugn.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onBookClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1c1a18] text-white text-[14px] font-medium px-6 py-3 rounded shadow-sm hover:bg-[#4b4640] transition-all duration-200 cursor-pointer"
            >
              Boka tid online
              <Calendar className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onTreatmentsClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#eeeeeb] hover:bg-[#e8e8e5] text-[#1a1c1b] text-[14px] font-medium px-6 py-3 rounded transition-all duration-200 cursor-pointer"
            >
              Se behandlingsmeny
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Metric micro-details */}
          <div className="grid grid-cols-3 gap-4 pt-4 w-full max-w-lg bg-white p-4 rounded-lg shadow-sm border border-[#eeeeeb]">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-[#1a1c1b] block">4.9 / 5</span>
              <span className="text-[11px] font-semibold uppercase text-[#695c51] tracking-wider">350+ Omdömen</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold text-[#1a1c1b] block">100%</span>
              <span className="text-[11px] font-semibold uppercase text-[#695c51] tracking-wider">Ekologiskt</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold text-[#1a1c1b] block">1:1</span>
              <span className="text-[11px] font-semibold uppercase text-[#695c51] tracking-wider">Ostörd tid</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Column */}
        <div className="lg:col-span-6 relative">
          <div className="relative bg-[#e8e8e5] rounded-xl overflow-hidden shadow-md aspect-[4/3] sm:aspect-[16/11]">
            <img
              src={IMAGES.heroSalon}
              alt="Söder & Sax ljust minimalistiska ateljé i skandinavisk kalksten och cognacsläder"
              className="w-full h-full object-cover object-center"
            />
            {/* Floating location chip */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded shadow-sm flex items-center justify-between border border-[#eeeeeb]/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#695c51]" />
                <span className="text-xs sm:text-sm text-[#1a1c1b] font-medium">Nytorgsgatan 24, Södermalm</span>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#695c51] bg-[#eeeeeb] px-2.5 py-1 rounded">
                Tis–Lör
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
