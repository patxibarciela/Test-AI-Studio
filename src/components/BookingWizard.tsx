import React, { useState, useEffect } from 'react';
import { SERVICES, BARBERS, DATE_OPTIONS, TIME_SLOTS } from '../data/salonData';
import { Booking } from '../types';
import { ArrowRight, Check, CheckCircle2, Calendar as CalendarIcon, Clock, UserCheck, Sparkles, Shield } from 'lucide-react';

interface BookingWizardProps {
  preselectedServiceId?: string;
  preselectedBarberId?: string;
  onBookingConfirmed: (booking: Booking) => void;
  onOpenMyBookings?: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  preselectedServiceId,
  preselectedBarberId,
  onBookingConfirmed,
  onOpenMyBookings,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || 'klippning-sig'
  );
  const [selectedBarberId, setSelectedBarberId] = useState<string>(
    preselectedBarberId || 'forsta-lediga'
  );
  const [selectedDate, setSelectedDate] = useState<string>(DATE_OPTIONS[0].fullDateStr);
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[0]);

  // Form Inputs
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  // Confirmed booking state
  const [lastConfirmedBooking, setLastConfirmedBooking] = useState<Booking | null>(null);

  // Sync if preselectedServiceId changes externally
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
      setCurrentStep(2);
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedBarberId) {
      setSelectedBarberId(preselectedBarberId);
    }
  }, [preselectedBarberId]);

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  const selectedBarber = BARBERS.find((b) => b.id === selectedBarberId) || BARBERS[0];

  const handleNext = () => {
    setFormError('');
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setFormError('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setFormError('Vänligen fyll i ditt för- och efternamn.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Vänligen ange ett giltigt mobilnummer för SMS-bekräftelse.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Vänligen ange en giltig e-postadress.');
      return;
    }

    const newBooking: Booking = {
      id: 'SS-' + Math.floor(1000 + Math.random() * 9000),
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      servicePrice: selectedService.price,
      duration: selectedService.duration,
      barberId: selectedBarber.id,
      barberName: selectedBarber.name,
      date: selectedDate,
      time: selectedTime,
      customerName: fullName.trim(),
      customerPhone: phone.trim(),
      customerEmail: email.trim(),
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      status: 'bekräftad',
    };

    setLastConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
  };

  const handleReset = () => {
    setLastConfirmedBooking(null);
    setCurrentStep(1);
    setNotes('');
  };

  return (
    <section
      className="w-full py-16 lg:py-24 max-w-[1280px] mx-auto px-4 lg:px-8 scroll-mt-24"
      id="direktbokning"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-[11px] font-semibold uppercase text-[#695c51] tracking-widest block mb-2">
            Enkel bokning
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#1a1c1b] tracking-tight">
            Reservera din stol
          </h2>
          <p className="text-sm sm:text-base text-[#4b4640] mt-2">
            Boka i fyra enkla steg med omedelbar bekräftelse via SMS och e-post.
          </p>
        </div>

        {/* Booking Card Container */}
        <div className="bg-white rounded-xl p-5 sm:p-8 lg:p-10 shadow-md border border-[#eeeeeb]">
          {!lastConfirmedBooking ? (
            <>
              {/* Step Indicators */}
              <div className="grid grid-cols-4 gap-2 mb-8 pb-4 border-b border-[#eeeeeb]">
                {[
                  { num: 1, label: 'Tjänst' },
                  { num: 2, label: 'Barberare' },
                  { num: 3, label: 'Tid' },
                  { num: 4, label: 'Bekräftelse' },
                ].map((step) => {
                  const isActive = currentStep >= step.num;
                  const isCurrent = currentStep === step.num;
                  return (
                    <div
                      key={step.num}
                      className={`flex flex-col items-center text-center transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-40'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold mb-1 transition-colors ${
                          isCurrent
                            ? 'bg-[#1c1a18] text-white ring-2 ring-[#695c51]/30'
                            : isActive
                            ? 'bg-[#1c1a18] text-white'
                            : 'bg-[#eeeeeb] text-[#1a1c1b]'
                        }`}
                      >
                        {step.num < currentStep ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          step.num
                        )}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1a1c1b]">
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Step Content */}
              {/* STEG 1: Välj tjänst */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#1a1c1b]">
                      Steg 1: Välj önskad behandling
                    </span>
                    <span className="text-xs text-[#695c51] font-medium">
                      Steg 1 av 4
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {SERVICES.slice(0, 4).map((service) => {
                      const isSelected = selectedServiceId === service.id;
                      return (
                        <label
                          key={service.id}
                          className={`cursor-pointer p-4 rounded-lg border transition-all flex flex-col justify-between group ${
                            isSelected
                              ? 'bg-[#f1dfd1] border-[#695c51] shadow-sm ring-1 ring-[#695c51]'
                              : 'bg-[#f9f9f6] border-[#eeeeeb] hover:bg-[#eeeeeb]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="service"
                            value={service.id}
                            checked={isSelected}
                            onChange={() => setSelectedServiceId(service.id)}
                            className="sr-only"
                          />
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-sm sm:text-base font-semibold text-[#1a1c1b]">
                              {service.title}
                            </span>
                            <span className="text-sm sm:text-base font-bold text-[#1a1c1b] whitespace-nowrap ml-2">
                              {service.price} kr
                            </span>
                          </div>
                          <span className="text-xs text-[#695c51] leading-relaxed">
                            {service.duration} min • {service.category === 'klippning' ? 'Schamponering & knivfinish' : service.category === 'rakning' ? 'Varma omslag & balms' : 'Klippning + skäggvård / rakning'}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-[#1c1a18] text-white text-sm font-medium px-6 py-2.5 rounded hover:bg-[#4b4640] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      Nästa: Välj barberare
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEG 2: Välj barberare */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#1a1c1b]">
                      Steg 2: Välj din barberare
                    </span>
                    <span className="text-xs text-[#695c51] font-medium">
                      Steg 2 av 4
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {BARBERS.slice(0, 3).map((barber) => {
                      const isSelected = selectedBarberId === barber.id;
                      return (
                        <label
                          key={barber.id}
                          className={`cursor-pointer p-4 rounded-lg border transition-all text-center flex flex-col items-center justify-center group ${
                            isSelected
                              ? 'bg-[#f1dfd1] border-[#695c51] shadow-sm ring-1 ring-[#695c51]'
                              : 'bg-[#f9f9f6] border-[#eeeeeb] hover:bg-[#eeeeeb]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="barber"
                            value={barber.id}
                            checked={isSelected}
                            onChange={() => setSelectedBarberId(barber.id)}
                            className="sr-only"
                          />
                          <div className="w-12 h-12 rounded-full bg-[#e8e8e5] flex items-center justify-center mb-3 text-[#1a1c1b] group-hover:scale-105 transition-transform">
                            {barber.id === 'forsta-lediga' ? (
                              <Sparkles className="w-5 h-5 text-[#695c51]" />
                            ) : (
                              <UserCheck className="w-5 h-5 text-[#695c51]" />
                            )}
                          </div>
                          <span className="text-sm sm:text-base font-semibold text-[#1a1c1b]">
                            {barber.name}
                          </span>
                          <span className="text-[11px] uppercase tracking-wider text-[#695c51] mt-1 line-clamp-2">
                            {barber.role}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="bg-[#eeeeeb] hover:bg-[#e8e8e5] text-[#1a1c1b] text-sm font-medium px-4 py-2.5 rounded transition-colors cursor-pointer"
                    >
                      Tillbaka
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-[#1c1a18] text-white text-sm font-medium px-6 py-2.5 rounded hover:bg-[#4b4640] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      Nästa: Välj tidpunkt
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEG 3: Välj datum och tidpunkt */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#1a1c1b]">
                      Steg 3: Välj datum och klockslag
                    </span>
                    <span className="text-xs text-[#695c51] font-medium">
                      Steg 3 av 4
                    </span>
                  </div>

                  {/* Date pills row */}
                  <div>
                    <span className="text-[11px] font-semibold uppercase text-[#695c51] block mb-2 tracking-wider">
                      Kommande dagar
                    </span>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {DATE_OPTIONS.map((d) => {
                        const isSelected = selectedDate === d.fullDateStr;
                        return (
                          <label
                            key={d.isoDate}
                            className={`cursor-pointer flex flex-col items-center justify-center py-3 rounded-lg border transition-all ${
                              isSelected
                                ? 'bg-[#1c1a18] text-white border-[#1c1a18] shadow-sm'
                                : 'bg-[#f9f9f6] text-[#1a1c1b] border-[#eeeeeb] hover:bg-[#eeeeeb]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="date"
                              value={d.fullDateStr}
                              checked={isSelected}
                              onChange={() => setSelectedDate(d.fullDateStr)}
                              className="sr-only"
                            />
                            <span className="text-[11px] uppercase font-medium">
                              {d.dayLabel}
                            </span>
                            <span className="text-lg font-bold">
                              {d.dayNum}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <span className="text-[11px] font-semibold uppercase text-[#695c51] block mb-2 tracking-wider">
                      Lediga tider
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map((t) => {
                        const isSelected = selectedTime === t;
                        return (
                          <label
                            key={t}
                            className={`cursor-pointer py-2.5 px-3 text-center rounded-lg border font-medium text-sm transition-all ${
                              isSelected
                                ? 'bg-[#1c1a18] text-white border-[#1c1a18] shadow-sm'
                                : 'bg-[#f9f9f6] text-[#1a1c1b] border-[#eeeeeb] hover:bg-[#eeeeeb]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="time"
                              value={t}
                              checked={isSelected}
                              onChange={() => setSelectedTime(t)}
                              className="sr-only"
                            />
                            {t}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="bg-[#eeeeeb] hover:bg-[#e8e8e5] text-[#1a1c1b] text-sm font-medium px-4 py-2.5 rounded transition-colors cursor-pointer"
                    >
                      Tillbaka
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-[#1c1a18] text-white text-sm font-medium px-6 py-2.5 rounded hover:bg-[#4b4640] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      Nästa: Slutför
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEG 4: Dina uppgifter och bekräftelse */}
              {currentStep === 4 && (
                <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#1a1c1b]">
                      Steg 4: Dina uppgifter
                    </span>
                    <span className="text-xs text-[#695c51] font-medium">
                      Steg 4 av 4
                    </span>
                  </div>

                  {/* Booking Summary Box */}
                  <div className="bg-[#f9f9f6] p-4 rounded-lg border border-[#eeeeeb] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <span className="text-[11px] font-semibold uppercase text-[#695c51] tracking-wider">
                        Vald bokning
                      </span>
                      <p className="text-base font-semibold text-[#1a1c1b]">
                        {selectedService.title}
                      </p>
                      <p className="text-xs sm:text-sm text-[#4b4640] mt-0.5">
                        {selectedBarber.name} • {selectedDate}, kl {selectedTime} ({selectedService.duration} min)
                      </p>
                    </div>
                    <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                      <span className="text-sm sm:text-base font-bold text-[#1a1c1b]">
                        {selectedService.price} kr
                      </span>
                      <span className="text-[11px] font-semibold text-[#695c51] bg-[#eeeeeb] px-2 py-0.5 rounded">
                        Betalas på plats
                      </span>
                    </div>
                  </div>

                  {formError && (
                    <div className="p-3 bg-[#ffdad6] text-[#ba1a1a] rounded text-xs sm:text-sm font-medium">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4b4640]">
                        För- &amp; Efternamn *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="t.ex. Marcus Westerberg"
                        className="bg-[#f9f9f6] border border-[#eeeeeb] px-3.5 py-2.5 rounded text-sm text-[#1a1c1b] focus:outline-none focus:ring-1 focus:ring-[#1c1a18] focus:border-[#1c1a18]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4b4640]">
                        Mobilnummer (för SMS-påminnelse) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="070-123 45 67"
                        className="bg-[#f9f9f6] border border-[#eeeeeb] px-3.5 py-2.5 rounded text-sm text-[#1a1c1b] focus:outline-none focus:ring-1 focus:ring-[#1c1a18] focus:border-[#1c1a18]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4b4640]">
                      E-postadress *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="marcus.westerberg@exempel.se"
                      className="bg-[#f9f9f6] border border-[#eeeeeb] px-3.5 py-2.5 rounded text-sm text-[#1a1c1b] focus:outline-none focus:ring-1 focus:ring-[#1c1a18] focus:border-[#1c1a18]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4b4640]">
                      Särskilda önskemål eller anteckningar (frivilligt)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="t.ex. känslig hårbotten, önskar tyst behandling, allergi"
                      className="bg-[#f9f9f6] border border-[#eeeeeb] px-3.5 py-2.5 rounded text-sm text-[#1a1c1b] focus:outline-none focus:ring-1 focus:ring-[#1c1a18] focus:border-[#1c1a18]"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#695c51] pt-1">
                    <Shield className="w-4 h-4 text-[#695c51]" />
                    <span>Fri avbokning fram till 24h innan besök. Inga förskottsbetalningar.</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="bg-[#eeeeeb] hover:bg-[#e8e8e5] text-[#1a1c1b] text-sm font-medium px-4 py-2.5 rounded transition-colors cursor-pointer"
                    >
                      Tillbaka
                    </button>
                    <button
                      type="submit"
                      className="bg-[#1c1a18] text-white text-sm font-medium px-6 py-2.5 rounded hover:bg-[#4b4640] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      Bekräfta bokning
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            /* Confirmation Screen */
            <div className="text-center py-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#f1dfd1] text-[#231a11] mx-auto flex items-center justify-center shadow-inner">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#695c51]">
                  Bokningsnummer: {lastConfirmedBooking.id}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#1a1c1b]">
                  Varmt välkommen till ateljén
                </h3>
                <p className="text-sm text-[#4b4640] max-w-md mx-auto leading-relaxed">
                  Din bokning är bekräftad. En bokningsbekräftelse med kalenderinbjudan och avbokningslänk har skickats till{' '}
                  <span className="font-medium text-[#1a1c1b]">{lastConfirmedBooking.customerEmail}</span> samt SMS till{' '}
                  <span className="font-medium text-[#1a1c1b]">{lastConfirmedBooking.customerPhone}</span>.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="max-w-md mx-auto bg-[#f9f9f6] p-5 rounded-lg border border-[#eeeeeb] text-left space-y-3">
                <div className="flex justify-between items-center border-b border-[#eeeeeb] pb-3">
                  <div>
                    <h4 className="font-semibold text-base text-[#1a1c1b]">
                      {lastConfirmedBooking.serviceTitle}
                    </h4>
                    <p className="text-xs text-[#695c51]">
                      {lastConfirmedBooking.barberName}
                    </p>
                  </div>
                  <span className="text-base font-bold text-[#1a1c1b]">
                    {lastConfirmedBooking.servicePrice} kr
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-[#4b4640]">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#695c51]" />
                    <span>{lastConfirmedBooking.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#4b4640]">
                    <Clock className="w-3.5 h-3.5 text-[#695c51]" />
                    <span>kl {lastConfirmedBooking.time} ({lastConfirmedBooking.duration} min)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#eeeeeb] text-[11px] text-[#695c51]">
                  Plats: Nytorgsgatan 24, Södermalm • Betalning sker på plats efter avslutad sittning.
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {onOpenMyBookings && (
                  <button
                    type="button"
                    onClick={onOpenMyBookings}
                    className="bg-[#1c1a18] text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded hover:bg-[#4b4640] transition-colors cursor-pointer"
                  >
                    Se mina bokningar
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-[#eeeeeb] text-[#1a1c1b] text-xs sm:text-sm font-medium px-5 py-2.5 rounded hover:bg-[#e8e8e5] transition-colors cursor-pointer"
                >
                  Gör en ny bokning
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
