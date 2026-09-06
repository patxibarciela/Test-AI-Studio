import { Service, Barber, DayOption } from '../types';

export const IMAGES = {
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNkzqS5lqHisg3cA6rDOxTK4gPfj95y_EqXKh79P3swsZH5UcnSyAEFnGjM29qIT66fZW_ruLNZsfZ92WdBNaNeu6ZHvhEnzeP3Iwk411Bqjzyz2Or-6URiZMI0zscefJ0M0aR7zxrR65CH1OQuBc3OESF-ES0oa_uVez0efcdgjZ6T5rFlHlxmCvtL02QsZmir36QfANWbLvOQOIShzu45sw62VgIPj6kjSffOHm9aDle4uN4-8lq",
  heroSalon: "https://lh3.googleusercontent.com/aida-public/AB6AXuARzOGfJaj9OwkiOFQVz8r5xkqtHsCC40kDKYV8xI2C6C-p52oHq1yXz2FpAt8wjqjMBHpbC6jQDUKR-hgUVKYWcMXsYdx9DYp_YO7FbbXeDob2fBGxpGiscnXJYd1OLS1Az5X-tRa-DeeAVU-OCaBeTHWZl8MN4hB840QYUvi8WOQf9Gp54N6YeQiXeYdcAF7yd09emww2FxHkkAXfueGYjvMehpBacAZPLtas6UTTVDwdtPYteAEy",
  scissorsLimestone: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzepXlaP_vQRRK3cucTT0S6M5XsYDMjJCtyZu2Lzw9isi3vAG4d0Dlu3FNg3vJuyYVAkrVnt1nTyAKR5xEvF1QwzbG3YUD0j6CccZPHfHDXOfqm6jWKHt7EkuCNAC0QNp7CLN8f7wEHfVud2g0Q3MbnpY0pdn7hp1WKcukUu_3tF2G1MLnibfD4elKdsE-6wxrPcZ1tOYH9vJW7scdESyUF5Wg-cuyJ8etWolCneo55fjUrq42qr-d",
  coffeeBeardBalm: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJgXTGnmpksgN2xbo87xq_2yi09Ja0euroibUv2ffUhiC64a1bZ-rkkJcAqaMqCj800P6JoOC7WQMhnY4HaCsZu9qGgxqH1tZCFsZTt20Y2vZreqzxkCkGKJFHdfYT7F1VWycEBe0tFKPpy7vWdA_6mygwS_DBOtQFqPLhXzdEkeD8_bgPvhHCT6V-qIFiAIdaPPYxut1embFribpg5OC9CHeJ1avP66Y_ta0XmoM1sWBVPxnQRSuZ",
  mapSodermalm: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYzRS1Xtth1zyn3Cyo9Ju7Mk-Xmz8Y-hACnMVAnZH-ICRkq_ooulRPF9Dqs4ySDQoPpL7DMtI2bsaEbeZd3kpNj9pJSLaIaQ4_NRVi2ay6Fc3Yh16THDQC84YLedRPN6BO8nHwHCI-xvIJZ7F9cxY6Ilqwhp-lVS4MaA72fBEgcei-P8rIoLXkZvQZFFMXE6tM4cw0d0_EdKOmUIum9F6ZJbMJZ4GXynhvJ4W3ifEtRjPh3yBvl8Bp",
};

export const SERVICES: Service[] = [
  {
    id: "klippning-sig",
    title: "Klippning Signature",
    category: "klippning",
    duration: 45,
    price: 690,
    description: "Konsultation, schamponering med hårbottenmassage, precisionsklippning, styling samt avslutande nackrakning med klassisk öppen kniv och varma handdukar.",
    tag: "POPULÄRAST",
    popular: true,
  },
  {
    id: "knivrakning",
    title: "Traditionell Knivrakning",
    category: "rakning",
    duration: 45,
    price: 590,
    description: "Varma och svalkande omslag preparerade med eteriska eukalyptusoljor, förberedande pre-shave, rakning med rakkniv samt svalkande aftershave balm.",
    tag: "KLASSIKER",
  },
  {
    id: "skagg-trim",
    title: "Skäggformning & Trim",
    category: "rakning",
    duration: 30,
    price: 450,
    description: "Arkitektonisk formning med sax och maskin, knivskarpa konturer längs kinder och hals samt vårdande svensktillverkad cederträ- och jojobaolja.",
    tag: "PRECISION",
  },
  {
    id: "atelier-ritual",
    title: "The Full Atelier Ritual",
    category: "ritual",
    duration: 75,
    price: 1150,
    description: "Signature klippning kombinerad med full knivrakning eller omfattande skäggvård, ångkompresser, ansiktsmassage samt valfri förfriskning från baren.",
    tag: "HELHETSUPPLEVELSE",
  },
  {
    id: "snabbputs",
    title: "Snabbputs & Konturering",
    category: "klippning",
    duration: 20,
    price: 320,
    description: "Underhåll av nacke, öronlinjer och polisonger mellan dina ordinarie klippbesök för en ständigt välvårdad silhuett.",
    tag: "SNABB SERVICE",
  },
  {
    id: "farg-kamning",
    title: "Gråhårsdämpning & Färgkamning",
    category: "tillval",
    duration: 30,
    price: 490,
    description: "Diskret och naturlig kamning som mjukar upp gråa partier i skägg eller hår utan skarp utväxtkant. Skräddarsydd tonmatchning.",
    tag: "DISCRETION",
  },
  {
    id: "harbottenkur",
    title: "Djupgående Hårbottenkur & Massage",
    category: "tillval",
    duration: 25,
    price: 390,
    description: "Mineralrik lermask och peeling för hårbotten, följt av 15 minuters akupressurmassage och svalkande pepparmyntstonic under ångad handduk.",
    tag: "VÅRDANDE",
  }
];

export const BARBERS: Barber[] = [
  {
    id: "forsta-lediga",
    name: "Första lediga tid",
    role: "Snabbast tillgänglighet",
    experience: "Alla våra barberare",
    specialty: "Perfekt om du är flexibel och önskar tid snarast",
    bio: "Vi tilldelar dig en av våra certifierade mästarbarberare som har tidigast tillgängliga lucka.",
  },
  {
    id: "elias-lindqvist",
    name: "Leonardo Lindqvist",
    role: "Master Barber & Grundare",
    experience: "12 års erfarenhet",
    specialty: "Klassiska frisyrer, saxarkitektur & texturering",
    bio: "Utbildad i London och Stockholm. Elias grundade Söder & Sax med visionen att förena tidlöst brittiskt barberarhantverk med ren skandinavisk estetik.",
  },
  {
    id: "johan-berg",
    name: "Johan Berg",
    role: "Skäggspecialist & Knivslipare",
    experience: "8 års erfarenhet",
    specialty: "Traditionell våtrakning, knivkonturer & skäggvård",
    bio: "Johan är passionerad knivsamlare och expert på klassisk knivrakning med varma omslag. Han slipar sina egna rakknivar för hand på japanska vattenstenar.",
  },
  {
    id: "anton-sjoberg",
    name: "Anton Sjöberg",
    role: "Senior Stylist",
    experience: "6 års erfarenhet",
    specialty: "Moderna fades, naturliga fall & färgkamning",
    bio: "Anton kombinerar klassiskt hantverk med ett öga för moderna, avslappnade silhuetter och diskret gråhårstoning.",
  }
];

export const DATE_OPTIONS: DayOption[] = [
  { dayLabel: "Tor", dayNum: "24", fullDateStr: "Tor 24 Okt", isoDate: "2026-10-24" },
  { dayLabel: "Fre", dayNum: "25", fullDateStr: "Fre 25 Okt", isoDate: "2026-10-25" },
  { dayLabel: "Lör", dayNum: "26", fullDateStr: "Lör 26 Okt", isoDate: "2026-10-26" },
  { dayLabel: "Tis", dayNum: "29", fullDateStr: "Tis 29 Okt", isoDate: "2026-10-29" },
  { dayLabel: "Ons", dayNum: "30", fullDateStr: "Ons 30 Okt", isoDate: "2026-10-30" },
  { dayLabel: "Tor", dayNum: "31", fullDateStr: "Tor 31 Okt", isoDate: "2026-10-31" },
  { dayLabel: "Fre", dayNum: "01", fullDateStr: "Fre 1 Nov", isoDate: "2026-11-01" },
];

export const TIME_SLOTS = [
  "10:00",
  "11:30",
  "13:00",
  "14:00",
  "15:30",
  "16:45",
  "17:45",
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "Den tveklöst bästa barberarupplevelsen i Stockholm. Total avkoppling, fantastiskt kaffe och en knivrakning som är ren konst.",
    author: "Marcus W.",
    tag: "Stammis sedan 2021",
    stars: 5,
  },
  {
    id: 2,
    quote: "Det lugn som råder i studion är sällsynt. Att få sitta i en bekväm stol i 45 minuter utan hets och komma ut perfekt klippt är ovärderligt.",
    author: "Christian N.",
    tag: "Kund sedan 2022",
    stars: 5,
  },
  {
    id: 3,
    quote: "Johans skäggformning är kirurgisk precision. Doften av trä, kalksten och varma handdukar gör att man längtar tillbaka.",
    author: "Henrik Lind",
    tag: "Södermalmsbo",
    stars: 5,
  }
];

export const FAQS = [
  {
    q: "Erbjuder ni drop-in?",
    a: "Vi rekommenderar alltid förbokning för att garantera din plats. Vi tar emot drop-in i mån av tid om en lucka uppstår i schemat."
  },
  {
    q: "Hur fungerar avbokning?",
    a: "Kostnadsfri avbokning kan göras fram till 24 timmar före bokad tid via länken i din bekräftelse eller direkt här i appen under 'Mina Bokningar'."
  },
  {
    q: "Hur betalar jag?",
    a: "Betalning sker alltid på plats i ateljén efter avslutad behandling med kort, Swish eller Apple Pay."
  },
  {
    q: "Serverar ni dryck under besöket?",
    a: "Ja, varje besök inleds med en kopp nymalet specialkaffe från ett lokalt Södermalmsrosteri, kolsyrat källvatten eller utvald hantverksdryck."
  }
];
