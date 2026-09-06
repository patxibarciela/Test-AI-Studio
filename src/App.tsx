import React, { useState, useEffect } from 'react';
import { Booking } from './types';
import { Header } from './components/Header';
import { TopRibbon } from './components/TopRibbon';
import { HeroSection } from './components/HeroSection';
import { TreatmentsSection } from './components/TreatmentsSection';
import { BarbersSection } from './components/BarbersSection';
import { BookingWizard } from './components/BookingWizard';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { MyBookingsModal } from './components/MyBookingsModal';

export default function App() {
  const [preselectedServiceId, setPreselectedServiceId] = useState<string>('klippning-sig');
  const [preselectedBarberId, setPreselectedBarberId] = useState<string>('forsta-lediga');
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize bookings with local storage
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('soder_sax_bookings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'SS-7192',
        serviceId: 'klippning-sig',
        serviceTitle: 'Klippning Signature',
        servicePrice: 690,
        duration: 45,
        barberId: 'elias-lindqvist',
        barberName: 'Elias Lindqvist',
        date: 'Tor 24 Okt',
        time: '10:00',
        customerName: 'Marcus Westerberg',
        customerPhone: '070-123 45 67',
        customerEmail: 'marcus.w@exempel.se',
        createdAt: new Date().toISOString(),
        status: 'bekräftad',
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('soder_sax_bookings', JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Bokning bekräftad för ${newBooking.date} kl ${newBooking.time}!`);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'avbokad' } : b))
    );
    showToast('Bokningen har avbokats.');
  };

  const scrollToBookingWidget = () => {
    document.getElementById('direktbokning')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectServiceAndBook = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    scrollToBookingWidget();
  };

  const handleSelectBarberAndBook = (barberId: string) => {
    setPreselectedBarberId(barberId);
    scrollToBookingWidget();
  };

  const handleScrollToSection = (targetId: string) => {
    if (targetId === 'hem') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f6] text-[#1a1c1b]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1a18] text-white px-5 py-3 rounded-lg shadow-xl text-xs sm:text-sm font-medium animate-in slide-in-from-bottom-3 duration-200 border border-[#eeeeeb]/30">
          {toastMessage}
        </div>
      )}

      {/* Main Top Sticky Header */}
      <Header
        bookings={bookings}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onBookNow={scrollToBookingWidget}
      />

      {/* Main Content Area (padding-top for fixed header) */}
      <main className="w-full pt-20 flex-1 flex flex-col">
        <TopRibbon />

        {/* 1. Hero Section */}
        <HeroSection
          onBookClick={scrollToBookingWidget}
          onTreatmentsClick={() => {
            document.getElementById('behandlingar')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Full Treatments & Pricing Menu with Category Tabs */}
        <TreatmentsSection onSelectService={handleSelectServiceAndBook} />

        {/* 3. Barbers Team Section */}
        <BarbersSection onSelectBarber={handleSelectBarberAndBook} />

        {/* 4. Booking Wizard Section */}
        <BookingWizard
          preselectedServiceId={preselectedServiceId}
          preselectedBarberId={preselectedBarberId}
          onBookingConfirmed={handleBookingConfirmed}
          onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        />

        {/* 5. Location, Hours, Transit Map & Contact Form (Philosophy section removed) */}
        <LocationSection />
      </main>
      {/* Footer */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* My Bookings Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onNewBookingClick={scrollToBookingWidget}
      />
    </div>
  );
}
