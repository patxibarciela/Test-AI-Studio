import React, { useState, useEffect } from 'react';
import { IMAGES } from '../data/salonData';
import { Booking } from '../types';
import { User, Menu, X, Calendar } from 'lucide-react';

interface HeaderProps {
  bookings: Booking[];
  onOpenMyBookings: () => void;
  onBookNow: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  bookings,
  onOpenMyBookings,
  onBookNow,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hem');
  const activeBookingsCount = bookings.filter((b) => b.status === 'bekräftad').length;

  const navLinks = [
    { id: 'hem', label: 'Hem', targetId: 'hem' },
    { id: 'behandlingar', label: 'Behandlingar & Priser', targetId: 'behandlingar' },
    { id: 'barberare', label: 'Våra Barberare', targetId: 'barberare' },
    { id: 'boka', label: 'Boka Tid', targetId: 'direktbokning' },
    { id: 'kontakt', label: 'Kontakt & Hitta hit', targetId: 'kontakt' },
  ];

  // Scroll listener to update active nav link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 300) {
        setActiveSection('hem');
        return;
      }

      const sections = ['kontakt', 'direktbokning', 'barberare', 'behandlingar'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            if (sectionId === 'direktbokning') setActiveSection('boka');
            else setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (targetId: string, navId: string) => {
    setActiveSection(navId);
    setMobileMenuOpen(false);

    if (navId === 'hem') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f9f9f6]/95 backdrop-blur-md border-b border-[#eeeeeb] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-20 max-w-[1280px] mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          type="button"
          onClick={() => scrollToSection('hem', 'hem')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <img
            src={IMAGES.logo}
            alt="Söder & Sax Emblem"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
          />
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-lg text-[#1a1c1b] font-sans leading-none">
              SÖDER &amp; SAX
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#695c51] mt-0.5">
              Barberare • Södermalm
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.targetId, link.id)}
                className={`text-[14px] leading-5 transition-all py-1.5 px-1 relative cursor-pointer ${
                  isActive
                    ? 'text-[#1a1c1b] font-semibold'
                    : 'text-[#4b4640] hover:text-[#1a1c1b] font-medium'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-[#1c1a18] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Account */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBookNow}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 bg-[#1c1a18] text-white text-[14px] font-medium px-4 py-2 rounded hover:bg-[#4b4640] transition-colors duration-200 shadow-sm cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Boka Tid
          </button>

          {/* Profile / My Bookings button */}
          <button
            type="button"
            onClick={onOpenMyBookings}
            title="Mina bokningar"
            className="relative w-9 h-9 rounded-full bg-[#1c1a18] text-white flex items-center justify-center hover:bg-[#4b4640] transition-colors duration-200 cursor-pointer shadow-xs"
          >
            <User className="w-4 h-4" />
            {activeBookingsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#d4a373] text-[#1a1c1b] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                {activeBookingsCount}
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1a1c1b] hover:bg-[#eeeeeb] rounded transition-colors cursor-pointer"
            aria-label="Öppna meny"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f9f9f6] border-b border-[#eeeeeb] px-6 py-5 shadow-lg animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.targetId, link.id)}
                  className={`text-left text-base py-2 px-2 rounded transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#1a1c1b] font-semibold bg-[#eeeeeb]/60 border-l-3 border-[#1c1a18]'
                      : 'text-[#4b4640] font-normal hover:text-[#1a1c1b]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-3 border-t border-[#eeeeeb] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookNow();
                }}
                className="w-full bg-[#1c1a18] text-white py-3 rounded text-sm font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                Reservera tid online
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyBookings();
                }}
                className="w-full bg-white border border-[#eeeeeb] text-[#1a1c1b] py-2.5 rounded text-sm font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4" />
                Mina bokningar ({activeBookingsCount})
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
