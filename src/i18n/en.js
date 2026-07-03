export default {
  code: 'en',
  nav: [
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#process', label: 'How we work' },
    { href: '#work', label: 'Work in progress' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ],
  hero: {
    badge: '12+ month warranty · Fixed price in the contract',
    title: 'Turnkey design, renovation & furniture in Kyiv',
    subtitle:
      "We don't do renovations «just to get them done». One team is responsible for everything — from the first sketch to the last kitchen handle.",
    ctaPrimary: 'Get a consultation',
    ctaSecondary: 'View portfolio',
    imageAlt: 'Completed A-PRO interior',
  },
  stats: [
    { value: '10+', label: 'years in design & renovation' },
    { value: '10', label: 'projects running simultaneously' },
    { value: '50%', label: 'of clients work with us remotely' },
    { value: '12+', label: 'months of warranty on work & furniture' },
  ],
  services: {
    eyebrow: 'Services',
    title: 'Full cycle',
    description:
      'Ordering the full package from one team saves you 5–20% of the budget and all the time you would spend coordinating contractors.',
    items: [
      {
        id: 'design',
        title: 'Interior design',
        description:
          'Apartments, houses, offices and commercial spaces. We think through every detail — from ergonomics to power sockets. Our fastest project took 5 days: 60 m² in three variants.',
        features: ['Residential & commercial spaces', 'Pet-friendly solutions', 'Rental & Airbnb projects'],
        image: '/images/covers/screen_02.webp',
      },
      {
        id: 'renovation',
        title: 'Turnkey renovation',
        description:
          'Complete renovation of apartments, houses and commercial property. One team runs the project from demolition to final cleaning — you accept a finished space.',
        features: ['from ₴10,000/m²', 'Design project included in the price', 'Fixed estimate in the contract'],
        image: '/images/cases/royal-tower.webp',
      },
      {
        id: 'furniture',
        title: 'Custom furniture',
        description:
          'Our own production of cabinet and upholstered furniture: wood, MDF, metal. A 7-metre ash kitchen — from ₴100,000, ~70 days production, 2–5 days installation.',
        features: ['from ₴4,000/m² for cabinet furniture', 'Payment in parts 70/20/10', 'Warranty over a year'],
        image: '/images/cases/chicago-modern.webp',
      },
      {
        id: 'fitout',
        title: 'Fit-out & décor',
        description:
          'We select and install appliances, lighting, textiles and décor. Ordering the full package saves you 5–20% of the budget and all of your time.',
        features: ['Appliances & lighting', 'Décor down to the last key', 'Real estate investment advice'],
        image: '/images/cases/royal-tower-airbnb.webp',
      },
    ],
  },
  portfolio: {
    eyebrow: 'Portfolio',
    title: 'Spaces people already live and work in',
    description:
      'Every project is a completed site in Kyiv: apartments, offices, schools and medical spaces.',
    prevLabel: 'Previous',
    nextLabel: 'Next',
    closeLabel: 'Close',
    groups: [
      { id: 'apartments', label: 'Apartments' },
      { id: 'commercial', label: 'Commercial' },
    ],
    cases: [
      { id: 'royal-tower', title: 'Royal Tower', tag: 'Apartment · Premium', category: 'apartments', image: '/images/cases/royal-tower.webp' },
      { id: 'sky-line', title: 'Sky Line', tag: 'Apartment · Premium', category: 'apartments', image: '/images/cases/sky-line.webp' },
      { id: 'chicago-pet', title: 'Chicago Central House', tag: 'Apartment · Pet-friendly', category: 'apartments', image: '/images/cases/chicago-pet.webp' },
      { id: 'chicago-modern', title: 'Chicago Central House', tag: 'Apartment · Modern Classic', category: 'apartments', image: '/images/cases/chicago-modern.webp' },
      { id: 'royal-tower-airbnb', title: 'Royal Tower', tag: 'Apartment · Airbnb', category: 'apartments', image: '/images/cases/royal-tower-airbnb.webp' },
      { id: 'demiivka', title: 'Demiivka', tag: 'Apartment · Business class', category: 'apartments', image: '/images/cases/demiivka.webp' },
      { id: 'auroom', title: 'Auroom', tag: 'Apartment', category: 'apartments', image: '/images/cases/auroom.webp' },
      { id: 'nova-angliya', title: 'Nova Anglia', tag: 'Apartment', category: 'apartments', image: '/images/cases/nova-angliya.webp' },
      { id: 'kahovska', title: 'Kakhovska', tag: 'Apartment', category: 'apartments', image: '/images/cases/kahovska.webp' },
      { id: 'obukhivska', title: 'Obukhivska', tag: 'Apartment', category: 'apartments', image: '/images/cases/obukhivska.webp' },
      { id: 'remedia-office', title: 'Remediya office', tag: 'Commercial · Office', category: 'commercial', image: '/images/cases/remedia-office.webp' },
      { id: 'office-center', title: 'Office centre', tag: 'Commercial · Office', category: 'commercial', image: '/images/cases/office-center.webp' },
      { id: 'school', title: 'Globe International School', tag: 'Commercial · Education', category: 'commercial', image: '/images/cases/school.webp' },
      { id: 'salon', title: 'Beauty salon', tag: 'Commercial · Beauty', category: 'commercial', image: '/images/cases/salon.webp' },
      { id: 'dila', title: 'Medical laboratory', tag: 'Commercial · Medical', category: 'commercial', image: '/images/cases/dila.webp' },
      { id: 'barbershop', title: 'Barbershop', tag: 'Commercial · Beauty', category: 'commercial', image: '/images/cases/barbershop.webp' },
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'How much a renovation costs',
    description:
      'Honest starting prices with no fine print. We calculate the exact estimate after measuring your space and fix it in the contract.',
    from: 'from',
    perUnit: '₴/m²',
    featuredBadge: 'Most popular',
    tiers: [
      {
        id: 'secondary',
        name: 'Resale property',
        subtitle: 'Full renovation',
        price: '10,000',
        description:
          'Complete home renewal: demolition, replacement of utilities, levelling and finishing work.',
        featured: false,
      },
      {
        id: 'newbuild',
        name: 'New build',
        subtitle: 'Turnkey renovation',
        price: '12,000',
        description:
          'From a concrete shell to a finished home: rough and finishing work, furniture and fit-out.',
        featured: true,
      },
      {
        id: 'elite',
        name: 'High-end',
        subtitle: 'Luxury renovation',
        price: '14,000',
        description:
          'Complex design solutions, premium materials and impeccable attention to detail.',
        featured: false,
      },
    ],
    banner: {
      title: 'The design project is already included in the turnkey renovation price',
      text: 'When you order a full renovation, the design project and designer supervision come at no extra cost. Ordered separately, a design project costs $45/m² — with a renovation, that money stays in your budget.',
      cta: 'Estimate my project',
    },
  },
  process: {
    eyebrow: 'How we work',
    title: 'Six steps to a finished home',
    description:
      'A transparent process with no surprises: you always know what is happening on site and what it costs.',
    steps: [
      {
        title: 'Introduction & consultation',
        description:
          'We meet on site or online. We listen to how you live and what you love, assess the space and honestly say what is possible within your budget.',
      },
      {
        title: 'Design project',
        description:
          'Layouts, visualisations, working drawings and material specifications. You see your future home before the renovation begins. Our record: a 60 m² project in three variants in just 5 days.',
      },
      {
        title: 'Estimate & contract',
        description:
          'We calculate everything down to the smallest detail and fix the price and timeline in the contract. No «surprises» at the end of the renovation.',
      },
      {
        title: 'Renovation works',
        description:
          'Our own crews run the site on schedule. Every week you receive photo reports — half of our clients accept the work without ever visiting Kyiv.',
      },
      {
        title: 'Furniture & fit-out',
        description:
          'While the renovation is under way we produce the furniture and order appliances and lighting. A solid-wood kitchen takes ~70 days to make — that is exactly why we start production early, so everything falls into place on time.',
      },
      {
        title: 'Handover & warranty',
        description:
          'We clean up and hand over the keys and documentation. All work and furniture carry a warranty of over a year — and we always stay in touch.',
      },
    ],
  },
  principles: {
    eyebrow: 'Why clients trust us',
    title: 'Principles we never compromise on',
    items: [
      {
        title: 'No «just get it done» renovations',
        description:
          "We deliberately don't take on partial renovations or finish someone else's work. We answer for the result only when we control the whole process.",
      },
      {
        title: 'One team — one responsibility',
        description:
          "The designer, builders and furniture makers all work in one company. You won't have to coordinate contractors or look for someone to blame.",
      },
      {
        title: 'Transparent money',
        description:
          'The estimate is fixed in the contract; furniture is paid in parts: 70% deposit, 20% before delivery, 10% after installation.',
      },
      {
        title: 'Remote — just as reliable',
        description:
          'About half of our clients live abroad. Photo reports, video calls from the site and an English-speaking team — everything stays under control.',
      },
      {
        title: 'Pet-friendly expertise',
        description:
          'We express our love for pets in well-thought-out details: durable materials, safe finishes, dedicated spots for bowls and beds.',
      },
      {
        title: 'Warranty over a year',
        description:
          'Renovation work and our own furniture carry a 12+ month warranty — and we genuinely come back if anything needs attention.',
      },
    ],
  },
  work: {
    eyebrow: 'Work in progress',
    title: 'No filters: this is what our work looks like',
    description:
      "Demolition, wiring, rough and finishing work — we aren't shy about showing the process, because that's where the quality of the result comes from.",
    photoAlt: 'A-PRO work in progress — photo',
  },
  faq: {
    eyebrow: 'Questions & answers',
    title: 'Everything people usually ask before a renovation',
    items: [
      {
        question: 'How much does a turnkey renovation cost?',
        answer:
          'A full renovation of a resale property starts from ₴10,000/m², a turnkey renovation in a new build from ₴12,000/m², and a luxury renovation from ₴14,000/m². The design project and designer supervision are already included. The exact estimate is fixed in the contract — the price does not «grow» during the work.',
      },
      {
        question: 'How long does an apartment renovation take?',
        answer:
          'A two-room apartment renovation takes 3.5–5 months depending on the complexity of the project. The timeline is written into the contract and we keep to the schedule.',
      },
      {
        question: 'Can I order just the design project?',
        answer:
          'Yes. Ordered separately, a design project with designer supervision costs $45/m². And if you order a turnkey renovation, the design project is included in the price. Our fastest project took 5 days — 60 m² in three variants.',
      },
      {
        question: 'How is furniture paid for?',
        answer:
          'In parts: a 70% deposit to start production, 20% before delivery and 10% after installation is complete. You pay the last part when everything is in place and checked.',
      },
      {
        question: "I'm not in Kyiv. How do I stay in control of the renovation?",
        answer:
          'About 50% of our clients cannot visit the site regularly. We send weekly photo reports and hold video calls from the site, and our architects and managers speak English.',
      },
      {
        question: 'What warranty do you provide?',
        answer:
          'Renovation work and furniture of our own production carry a warranty of over a year. The warranty terms are fixed in the contract.',
      },
      {
        question: 'Will you finish a renovation started by another crew?',
        answer:
          "No. We don't take on partial renovations or finish other people's work — because we cannot guarantee the quality of something we didn't control from the very beginning. We take responsibility for the full cycle.",
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's discuss your project",
    description:
      'The consultation is free and comes with no obligations. Tell us about your space — we will honestly say what is possible within your budget.',
    hours: [
      { days: 'Mon — Fri', time: '8:00 – 22:00' },
      { days: 'Sat — Sun', time: '10:00 – 19:00' },
    ],
    form: {
      nameLabel: 'Your name',
      namePlaceholder: 'Olena',
      nameError: 'Please tell us your name',
      phoneLabel: 'Phone',
      phonePlaceholder: '+38 (0__) ___-__-__',
      phoneError: 'Please enter a phone number, e.g. +38 (067) 123-45-67',
      messageLabel: 'About your project',
      messagePlaceholder: 'A 68 m² two-room apartment in a new build, need design and renovation…',
      submit: 'Get a free consultation',
      sending: 'Sending…',
      privacy: 'We only call about your project. No mailing lists.',
      successTitle: 'Thank you',
      successText: 'We have received your request and will call you back shortly during working hours.',
      failText: 'Unfortunately, the request could not be sent. Please try again or call us:',
    },
  },
  footer: {
    tagline: 'Interior design, turnkey renovation and custom furniture in Kyiv.',
    rights: 'All rights reserved.',
    navLabel: 'Footer',
  },
}
