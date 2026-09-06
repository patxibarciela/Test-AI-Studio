import React from 'react';
import { BARBERS } from '../data/salonData';
import { Scissors, UserCheck, ArrowRight, Award } from 'lucide-react';

interface BarbersSectionProps {
  onSelectBarber: (barberId: string) => void;
}

export const BarbersSection: React.FC<BarbersSectionProps> = ({ onSelectBarber }) => {
  const individualBarbers = BARBERS.filter((b) => b.id !== 'forsta-lediga');

  return (
    <section
      id="barberare"
      className="w-full py-16 lg:py-24 max-w-[1280px] mx-auto px-4 lg:px-8 scroll-mt-20"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase text-[#695c51] tracking-widest block mb-2">
            Vårt Team
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#1a1c1b] tracking-tight">
            Mästare i sax och öppen kniv
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#4b4640] max-w-md leading-relaxed">
          Bakom stolarna på Söder &amp; Sax står erfarna yrkesmän som delar passionen för klassiska snitt, ergonomisk saxgeometri och traditionell knivrakning.
        </p>
      </div>

      {/* Barbers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {individualBarbers.map((barber) => (
          <div
            key={barber.id}
            className="bg-white rounded-2xl border border-[#eeeeeb] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Header Box */}
              <div className="h-44 bg-[#f4f4f1] p-6 flex flex-col justify-between border-b border-[#eeeeeb] relative">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1a1c1b] group-hover:scale-105 transition-transform">
                    <UserCheck className="w-7 h-7 text-[#695c51]" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#695c51] bg-white px-2.5 py-1 rounded shadow-xs inline-flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#695c51]" />
                    {barber.experience}
                  </span>
                </div>
                <div>
                  <h3 className="font-editorial text-2xl text-[#1a1c1b]">
                    {barber.name}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#695c51]">
                    {barber.role}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1a1c1b] block mb-1">
                    Specialitet
                  </span>
                  <p className="text-xs sm:text-sm text-[#4b4640] bg-[#f9f9f6] p-2.5 rounded border border-[#eeeeeb]">
                    {barber.specialty}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1a1c1b] block mb-1">
                    Om barberaren
                  </span>
                  <p className="text-xs sm:text-sm text-[#4b4640] leading-relaxed">
                    {barber.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="p-6 pt-0 border-t border-[#eeeeeb]/60 mt-2">
              <button
                type="button"
                onClick={() => onSelectBarber(barber.id)}
                className="w-full bg-[#1c1a18] text-white py-2.5 rounded text-xs sm:text-sm font-medium hover:bg-[#4b4640] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                Boka hos {barber.name.split(' ')[0]}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick note banner */}
      <div className="bg-[#f4f4f1] p-5 sm:p-6 rounded-xl border border-[#eeeeeb] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
            <Scissors className="w-5 h-5 text-[#695c51]" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-[#1a1c1b]">Är du flexibel med vem du klipper dig hos?</h4>
            <p className="text-xs text-[#4b4640]">Välj &ldquo;Första lediga tid&rdquo; i bokningssystemet för att hitta snabbast möjliga tid.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onSelectBarber('forsta-lediga')}
          className="bg-white hover:bg-[#eeeeeb] text-[#1a1c1b] border border-[#eeeeeb] px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0"
        >
          Hitta snabbast lediga tid
        </button>
      </div>
    </section>
  );
};
