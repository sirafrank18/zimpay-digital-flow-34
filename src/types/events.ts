// Event types and interfaces for the Creator Hub
export interface EventType {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  features: string[];
  fields: EventField[];
}

export interface EventField {
  name: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'time' | 'select' | 'multiselect' | 'boolean';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: string;
  creatorId: string;
  startDate: string;
  endDate?: string;
  location: string;
  capacity?: number;
  price: number;
  currency: string;
  isActive: boolean;
  isFeatured?: boolean;
  imageUrl?: string;
  tags: string[];
  customFields: Record<string, any>;
  ticketsSold: number;
  totalEarnings: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  participantName: string;
  participantEmail: string;
  participantPhone?: string;
  ticketQuantity: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  registrationDate: string;
  specialRequests?: string;
  additionalInfo?: Record<string, any>;
}

export const EVENT_TYPES: EventType[] = [
  {
    id: 'sports',
    name: 'Sports Event',
    icon: '⚽',
    description: 'Sports competitions, tournaments, and athletic events',
    category: 'Sports & Recreation',
    features: ['Team management', 'Score tracking', 'Tournament brackets'],
    fields: [
      { name: 'sport', type: 'select', label: 'Sport Type', required: true, options: ['Football', 'Basketball', 'Tennis', 'Swimming', 'Running', 'Cycling', 'Other'] },
      { name: 'teams', type: 'multiselect', label: 'Participating Teams', options: [] },
      { name: 'tournament', type: 'boolean', label: 'Tournament Format' },
      { name: 'ageGroup', type: 'select', label: 'Age Group', options: ['Under 18', '18-25', '26-35', '36-45', '46+', 'All Ages'] },
      { name: 'skillLevel', type: 'select', label: 'Skill Level', options: ['Beginner', 'Intermediate', 'Advanced', 'Professional'] }
    ]
  },
  {
    id: 'conference',
    name: 'Conference',
    icon: '🎤',
    description: 'Professional conferences, seminars, and business events',
    category: 'Business & Professional',
    features: ['Speaker management', 'Session scheduling', 'Networking tools'],
    fields: [
      { name: 'industry', type: 'select', label: 'Industry', required: true, options: ['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Other'] },
      { name: 'speakers', type: 'textarea', label: 'Keynote Speakers' },
      { name: 'sessions', type: 'number', label: 'Number of Sessions' },
      { name: 'networking', type: 'boolean', label: 'Networking Session' },
      { name: 'certification', type: 'boolean', label: 'Offers Certification' }
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎭',
    description: 'Shows, performances, and entertainment events',
    category: 'Arts & Entertainment',
    features: ['Performer showcase', 'Show scheduling', 'VIP packages'],
    fields: [
      { name: 'performanceType', type: 'select', label: 'Performance Type', required: true, options: ['Theater', 'Dance', 'Comedy', 'Magic', 'Variety Show', 'Other'] },
      { name: 'performers', type: 'textarea', label: 'Featured Performers' },
      { name: 'duration', type: 'number', label: 'Duration (minutes)' },
      { name: 'ageRating', type: 'select', label: 'Age Rating', options: ['All Ages', 'PG', 'PG-13', '18+'] },
      { name: 'vipPackage', type: 'boolean', label: 'VIP Package Available' }
    ]
  },
  {
    id: 'concert',
    name: 'Concert',
    icon: '🎵',
    description: 'Musical performances and concerts',
    category: 'Music & Arts',
    features: ['Artist management', 'Sound setup', 'Merchandise'],
    fields: [
      { name: 'genre', type: 'select', label: 'Music Genre', required: true, options: ['Rock', 'Pop', 'Jazz', 'Classical', 'Hip-Hop', 'Country', 'Electronic', 'Other'] },
      { name: 'artist', type: 'text', label: 'Main Artist/Band', required: true },
      { name: 'supportingActs', type: 'textarea', label: 'Supporting Acts' },
      { name: 'setDuration', type: 'number', label: 'Set Duration (minutes)' },
      { name: 'merchandise', type: 'boolean', label: 'Merchandise Available' }
    ]
  },
  {
    id: 'summit',
    name: 'Summit',
    icon: '🏔️',
    description: 'Leadership summits and high-level gatherings',
    category: 'Business & Leadership',
    features: ['Executive networking', 'Panel discussions', 'Thought leadership'],
    fields: [
      { name: 'theme', type: 'text', label: 'Summit Theme', required: true },
      { name: 'targetAudience', type: 'select', label: 'Target Audience', options: ['C-Level', 'VP/Directors', 'Managers', 'Entrepreneurs', 'Mixed'] },
      { name: 'panels', type: 'number', label: 'Number of Panels' },
      { name: 'workshops', type: 'number', label: 'Number of Workshops' },
      { name: 'exclusiveAccess', type: 'boolean', label: 'Exclusive Access Areas' }
    ]
  },
  {
    id: 'church',
    name: 'Church Event',
    icon: '⛪',
    description: 'Religious gatherings and spiritual events',
    category: 'Religious & Spiritual',
    features: ['Ministry coordination', 'Prayer requests', 'Community outreach'],
    fields: [
      { name: 'eventType', type: 'select', label: 'Event Type', required: true, options: ['Service', 'Revival', 'Conference', 'Fellowship', 'Baptism', 'Wedding', 'Other'] },
      { name: 'minister', type: 'text', label: 'Minister/Pastor' },
      { name: 'denomination', type: 'select', label: 'Denomination', options: ['Baptist', 'Methodist', 'Presbyterian', 'Catholic', 'Pentecostal', 'Non-denominational', 'Other'] },
      { name: 'childcare', type: 'boolean', label: 'Childcare Available' },
      { name: 'livestream', type: 'boolean', label: 'Live Stream Available' }
    ]
  },
  {
    id: 'charity',
    name: 'Charity Event',
    icon: '❤️',
    description: 'Fundraising and charitable events',
    category: 'Non-Profit & Charity',
    features: ['Donation tracking', 'Volunteer management', 'Impact reporting'],
    fields: [
      { name: 'cause', type: 'text', label: 'Cause/Purpose', required: true },
      { name: 'beneficiary', type: 'text', label: 'Beneficiary Organization' },
      { name: 'fundraisingGoal', type: 'number', label: 'Fundraising Goal ($)' },
      { name: 'donationType', type: 'select', label: 'Donation Type', options: ['Monetary', 'Goods', 'Services', 'Mixed'] },
      { name: 'volunteerNeeded', type: 'boolean', label: 'Volunteers Needed' }
    ]
  },
  {
    id: 'ticketing',
    name: 'General Ticketing',
    icon: '🎫',
    description: 'Generic ticketed events and experiences',
    category: 'General Events',
    features: ['Multi-tier pricing', 'Seat selection', 'Group discounts'],
    fields: [
      { name: 'category', type: 'select', label: 'Event Category', required: true, options: ['Workshop', 'Seminar', 'Experience', 'Tour', 'Class', 'Other'] },
      { name: 'difficulty', type: 'select', label: 'Difficulty Level', options: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'] },
      { name: 'prerequisites', type: 'textarea', label: 'Prerequisites' },
      { name: 'materials', type: 'textarea', label: 'Materials Provided' },
      { name: 'groupDiscount', type: 'boolean', label: 'Group Discount Available' }
    ]
  }
];

export const EVENT_CATEGORIES = [
  'Sports & Recreation',
  'Business & Professional',
  'Arts & Entertainment',
  'Music & Arts',
  'Business & Leadership',
  'Religious & Spiritual',
  'Non-Profit & Charity',
  'General Events'
];