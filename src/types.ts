export interface Service {
  id: string;
  title: string;
  category: 'klippning' | 'rakning' | 'ritual' | 'tillval';
  duration: number; // minutes
  price: number; // SEK
  description: string;
  tag?: string;
  popular?: boolean;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  bio: string;
  imageUrl?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DayOption {
  dayLabel: string; // e.g. "Tor"
  dayNum: string; // e.g. "24"
  fullDateStr: string; // e.g. "Tor 24 Okt"
  isoDate: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  servicePrice: number;
  duration: number;
  barberId: string;
  barberName: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  createdAt: string;
  status: 'bekräftad' | 'avbokad';
}

export type NavScreen = 'hem' | 'behandlingar-och-priser' | 'om-salongen' | 'vara-barberare' | 'kontakt' | 'boka-tid';
