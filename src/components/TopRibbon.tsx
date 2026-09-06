import React from 'react';

export const TopRibbon: React.FC = () => {
  return (
    <section className="w-full bg-[#f4f4f1] py-2 text-center px-4 border-b border-[#eeeeeb]">
      <p className="text-[11px] uppercase tracking-widest text-[#4b4640] font-semibold flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1c1a18] inline-block"></span>
        Nytorgsgatan 24, Södermalm • Endast tidsbokning &amp; drop-in i mån av tid • Tis – Lör
      </p>
    </section>
  );
};
