// Mock data backing the core registration flow.

export type BadgeKind = 'registrant' | 'dependent' | 'caregiver' | null;

export type FamilyMember = {
  id: string;
  name: string;
  initials: string;
  relationship: string;
  age: string;
  its: string;
  badge: BadgeKind;
  // Warning that must be resolved before this member can be allocated alone.
  warning?: {
    message: string;
    kind: 'guardian' | 'caregiver';
  };
};

export type Mehmaan = {
  id: string;
  name: string;
  initials: string;
  age: string;
  its: string;
};

export const family: FamilyMember[] = [
  {
    id: 'yusuf',
    name: 'Yusuf husain',
    initials: 'YH',
    relationship: 'Admin',
    age: '31',
    its: '30412786',
    badge: 'registrant',
  },
  {
    id: 'sakina',
    name: 'Sakina Husain',
    initials: 'SH',
    relationship: 'Spouse',
    age: '28',
    its: '30412790',
    badge: 'caregiver',
  },
  {
    id: 'nazia',
    name: 'Syed nazia',
    initials: 'SN',
    relationship: 'Daughter',
    age: '09',
    its: '30412790',
    badge: 'dependent',
    warning: {
      message: 'Children under 10 cannot be allocated independently. Assign a guardian.',
      kind: 'guardian',
    },
  },
  {
    id: 'mohammed',
    name: 'Mohammed husain',
    initials: 'MH',
    relationship: 'Father',
    age: '62',
    its: '30412790',
    badge: null,
  },
  {
    id: 'amatullah',
    name: 'Amatullah bhen',
    initials: 'AB',
    relationship: 'Mother',
    age: '58',
    its: '30412790',
    badge: 'dependent',
    warning: {
      message: 'This member requires medical assistance. Assign a caregiver.',
      kind: 'caregiver',
    },
  },
];

export const mehmaan: Mehmaan[] = [
  { id: 'm1', name: 'Yusuf Bhaisaheb', initials: 'YB', age: '31', its: '30412786' },
  { id: 'm2', name: 'Amina Khatun', initials: 'AK', age: '42', its: '30412786' },
  { id: 'm3', name: 'Rahim Miah', initials: 'RM', age: '22', its: '30412786' },
  { id: 'm4', name: 'Fatema Begum', initials: 'FB', age: '22', its: '30412786' },
  { id: 'm5', name: 'Jamal Uddin', initials: 'JU', age: '20', its: '30412786' },
];

export type EventStatus = 'live' | 'upcoming';

export type MiqaatEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  status: EventStatus;
  statusLine: string;
  countdown: { days: string; hours: string; mins: string; secs: string };
  cta: string;
};

export const events: MiqaatEvent[] = [
  {
    id: 'eid-ghadeer-live',
    title: 'Eid-e-Ghadeer 1447H',
    date: 'Sat, 21 Jun, 2026',
    time: '06:30 Am IST',
    status: 'live',
    statusLine: 'Registration ends in Thu, 19 Jun 2026 · 09:00 AM IST',
    countdown: { days: '02', hours: '02', mins: '13', secs: '26' },
    cta: 'Register now',
  },
  {
    id: 'eid-ghadeer-upcoming',
    title: 'Eid-e-Ghadeer 1447H',
    date: 'Mon, 23 Jun, 2026',
    time: '06:30 Am IST',
    status: 'upcoming',
    statusLine: 'Registration opens at Thu, 19 Jun 2026 · 09:00 AM IST',
    countdown: { days: '02', hours: '02', mins: '13', secs: '26' },
    cta: 'View Details',
  },
];

export const currentUser = {
  name: 'Murtaza bhai Moiz bhai Gheewala',
  its: '30412786',
  notifications: 3,
};

export const miqaatDetail = {
  title: 'Eid-e-Ghadeer 1447H',
  date: 'Sat, 21 Jun, 2026',
  time: '06:30 Am IST',
  salawat: 'اَللّٰهُمَّ صَلِّ عَلٰى مُحَمَّدٍ وَّ اٰلِ مُحَمَّد',
  fasal:
    'Fasal declared. Mumineen are invited to seek Raza for Ashara Mubaraka 1448H. May Allah grant all the taufeeq of haziri.',
  hostCity: 'Colombo',
  relayCenters: ['Mumbai', 'Surat', 'Karachi', 'Nairobi', 'London', 'Dubai'],
  notices: [
    'Registration closes on 5 June 2026 at 11:59 PM. Complete all group registrations and Raza requests before the deadline.',
    'Children below 10 years of age must be assigned to a parent or guardian before proceeding.',
    'Venue allocation is subject to availability and capacity limits.',
    'Host City registrations may close early once capacity is reached.',
    'Tickets will only be generated after all required approvals are completed.',
  ],
  videoCaption: 'Watch Introduction · Purpose & Travel Guidance',
};
