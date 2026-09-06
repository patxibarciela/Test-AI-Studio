import React from 'react';
import { Booking } from '../types';
import { X, Calendar, Clock, User, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onNewBookingClick: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onNewBookingClick,
}) => {
  if (!isOpen) return null;

  const activeBookings = bookings.filter((b) => b.status === 'bekräftad');
  const pastOrCancelledBookings = bookings.filter((b) => b.status === 'avbokad');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-[#eeeeeb] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#eeeeeb] flex items-center justify-between bg-[#f9f9f6]">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#695c51]">
              Konto &amp; Bokningar
            </span>
            <h3 className="font-editorial text-xl text-[#1a1c1b]">
              Mina reservationer
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#4b4640] hover:text-[#1a1c1b] hover:bg-[#eeeeeb] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeBookings.length === 0 && pastOrCancelledBookings.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#eeeeeb] flex items-center justify-center mx-auto text-[#695c51]">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-base text-[#1a1c1b]">Inga aktiva bokningar</h4>
              <p className="text-xs sm:text-sm text-[#4b4640] max-w-xs mx-auto">
                Du har inga inbokade sittningar just nu. Reservera en stol för att njuta av traditionellt hantverk på Södermalm.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onNewBookingClick();
                  }}
                  className="bg-[#1c1a18] text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded hover:bg-[#4b4640] transition-colors cursor-pointer"
                >
                  Boka tid nu
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Active Bookings */}
              {activeBookings.length > 0 && (
                <div className="space-y-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#695c51] block">
                    Kommande sittningar ({activeBookings.length})
                  </span>
                  {activeBookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-[#f9f9f6] p-4 rounded-xl border border-[#eeeeeb] space-y-3 relative"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1a1c1b]">
                              {b.id}
                            </span>
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded uppercase">
                              Bekräftad
                            </span>
                          </div>
                          <h4 className="font-semibold text-base text-[#1a1c1b] mt-1">
                            {b.serviceTitle}
                          </h4>
                        </div>
                        <span className="text-sm font-bold text-[#1a1c1b]">
                          {b.servicePrice} kr
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-[#4b4640] bg-white p-2.5 rounded border border-[#eeeeeb]">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#695c51]" />
                          <span>{b.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#695c51]" />
                          <span>kl {b.time} ({b.duration} min)</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          <User className="w-3.5 h-3.5 text-[#695c51]" />
                          <span>Barberare: {b.barberName}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-[#695c51]">
                          Kund: {b.customerName}
                        </span>
                        <button
                          onClick={() => {
                            if (window.confirm('Är du säker på att du vill avboka denna tid?')) {
                              onCancelBooking(b.id);
                            }
                          }}
                          className="text-red-700 hover:text-red-900 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Avboka
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Cancelled Bookings */}
              {pastOrCancelledBookings.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7d766f] block">
                    Avbokade sittningar
                  </span>
                  {pastOrCancelledBookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-[#eeeeeb]/50 p-3 rounded-lg border border-[#e8e8e5] text-xs text-[#7d766f] flex justify-between items-center opacity-75"
                    >
                      <div>
                        <span className="line-through block font-medium">
                          {b.serviceTitle} ({b.date}, kl {b.time})
                        </span>
                        <span>{b.barberName} • Ref: {b.id}</span>
                      </div>
                      <span className="text-[10px] bg-neutral-200 px-2 py-0.5 rounded uppercase font-semibold">
                        Avbokad
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#f9f9f6] border-t border-[#eeeeeb] flex justify-between items-center text-xs text-[#695c51]">
          <span>Nytorgsgatan 24, Södermalm</span>
          <button
            onClick={onClose}
            className="text-[#1a1c1b] font-medium hover:underline cursor-pointer"
          >
            Stäng
          </button>
        </div>
      </div>
    </div>
  );
};
