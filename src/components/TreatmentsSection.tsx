import React, { useState } from 'react';
import { SERVICES } from '../data/salonData';
import { ChevronRight, Clock, Sparkles } from 'lucide-react';

interface TreatmentsSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({
  onSelectService,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('alla');

  const categories = [
    { id: 'alla', label: 'Alla behandlingar' },
    { id: 'klippning', label: 'Klippning' },
    { id: 'rakning', label: 'Knivrakning & Skägg' },
    { id: 'ritual', label: 'Helhetsritualer' },
    { id: 'tillval', label: 'Kurer & Tillval' },
  ];

  const filteredServices =
    activeCategory === 'alla'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section
      id="behandlingar"
      className="w-full bg-[#f4f4f1] py-16 lg:py-24 border-y border-[#eeeeeb] scroll-mt-20"
    >
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase text-[#695c51] tracking-widest block mb-2">
              Meny &amp; Prislista
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1a1c1b] tracking-tight">
              Behandlingar &amp; Ritualer
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#4b4640] max-w-md leading-relaxed">
            Varje sittning inleds med personlig konsultation och kopp kaffe från vårt lokala mikrorosteri på Södermalm. Alla priser inkluderar tvätt och ekologiska kurer.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1c1a18] text-white shadow-sm'
                  : 'bg-white text-[#4b4640] hover:bg-[#e8e8e5] hover:text-[#1a1c1b] border border-[#eeeeeb]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="p-5 sm:p-6 bg-white rounded-xl border border-[#eeeeeb] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#1a1c1b] group-hover:text-[#695c51] transition-colors">
                      {service.title}
                    </h3>
                    {service.tag && (
                      <span
                        className={`inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                          service.popular
                            ? 'bg-[#f1dfd1] text-[#231a11]'
                            : 'bg-[#eae1d6] text-[#1f1b14]'
                        }`}
                      >
                        {service.tag}
                      </span>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-base sm:text-lg font-bold text-[#1a1c1b] block">
                      {service.price.toLocaleString('sv-SE')} kr
                    </span>
                    <span className="text-xs text-[#695c51] flex items-center gap-1 justify-end mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      {service.duration} min
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4b4640] leading-relaxed mt-2.5">
                  {service.description}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#eeeeeb] flex items-center justify-between">
                <span className="text-xs text-[#695c51] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#695c51]" />
                  Inkl. konsultation &amp; tvätt
                </span>
                <button
                  type="button"
                  onClick={() => onSelectService(service.id)}
                  className="bg-[#1c1a18] text-white hover:bg-[#4b4640] text-xs sm:text-sm font-medium px-4 py-2 rounded transition-all inline-flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer"
                >
                  Välj &amp; Boka
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
